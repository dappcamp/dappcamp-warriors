import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
