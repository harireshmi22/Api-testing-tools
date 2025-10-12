export default function ApiTesterLayout({ children }) {
    return (
        <div className="layout-container">
            {/* You can add common header/sidebar components here */}
            <main className="main-content">{children}</main>
        </div>
    );
}