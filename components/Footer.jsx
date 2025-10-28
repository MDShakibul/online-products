export default function Footer() {
  return (
    <footer className="border border-t-gray bg-nav">
      <div className="container px-4 py-6 text-sm text-white text-center">
        © {new Date().getFullYear()} Online Shop. All rights reserved.
      </div>
    </footer>
  );
}
