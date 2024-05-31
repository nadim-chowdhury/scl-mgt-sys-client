export default function RootLayout({ children }) {
  const isLoggedIn = true;

  return isLoggedIn ? children : <></>;
}
