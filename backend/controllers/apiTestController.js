import axios from "axios";
import RequestHistory from "../models/RequestHistory.js";

// Helper function to format header from array to object
const formatHeaders = (headersArray) => {
  const headers = {};
  headersArray
    .filter((h) => h.enabled)
    .forEach((h) => {
      headers[h.key] = h.value;
    });
  return headers;
};

// Helper function to format parameters
const formatParams = (paramsArray) => {
  const params = {};
  paramsArray
    .filter((p) => p.enabled)
    .forEach((p) => {
      params[p.key] = p.value;
    });
  return params;
};

// Main function to execute API test
export const executeRequest = async (req, res) => {
  try {
    const { method, url, headers = [], body, params = [] } = req.body;

    if (!method || !url) {
      return res.status(400).json({
        error: "Method and URL are required",
        time: 0
      });
    }

    const startTime = Date.now();

    try {
      // If body is an object, send as JSON; if string, try to parse; else send as is
      let dataToSend = body;
      if (typeof body === 'string') {
        try {
          dataToSend = JSON.parse(body);
        } catch (e) {
          // leave as string
          console.log("Body is not valid JSON, sending as text", e);

        }
      }
      const response = await axios({
        method: method.toLowerCase(),
        url,
        headers: formatHeaders(headers || []),
        params: formatParams(params || []),
        data: dataToSend,
        validateStatus: () => true, // Accept all status codes
        timeout: 10000 // 10 second timeout
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Save to history for all requests (authenticated or not)
      try {
        const historyItem = new RequestHistory({
          userId: req.userId || 'anonymous',
          method,
          url,
          headers,
          body,
          params,
          response: {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
            time: responseTime,
          },
        });
        await historyItem.save();
      } catch (historyError) {
        console.error("Failed to save history:", historyError.message);
        // Continue even if history saving fails
      }

      return res.json({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
        time: responseTime,
      });
    } catch (requestError) {
      return res.status(500).json({
        error: `Request failed: ${requestError.message}`,
        time: Date.now() - startTime
      });
    }
  } catch (error) {
    console.error("Execute request error:", error);
    return res.status(500).json({
      error: "Internal server error processing your request",
      time: 0
    });
  }
};

// Get user's request Hisotry

export const getHistory = async (req, res) => {
  try {
    const history = await RequestHistory.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specifi history item from Id;

export const getHistoryItem = async (req, res) => {
  try {
    const item = await RequestHistory.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!item) {
      return res.status(404).json({ error: "History item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a history
// DELETE /api/history/:id

export const deleteHistoryItem = async (req, res) => {
  try {
    await RequestHistory.deleteOne({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({ message: "History item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
