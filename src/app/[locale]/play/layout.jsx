import PlayFooter from "./components/PlayFooter";

const PlayLayout = async ({ children }) => {
  return (
    <main suppressHydrationWarning className="bg-background min-h-screen pb-4">
      {children}
      <PlayFooter />
    </main>
  );
};

export default PlayLayout;
