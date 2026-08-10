import HomePage from "../page";

export default function StartProjectPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "history.scrollRestoration='manual';scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;",
        }}
      />
      <HomePage />
    </>
  );
}
