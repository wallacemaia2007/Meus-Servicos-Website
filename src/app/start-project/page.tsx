import type { Metadata } from "next";

import { site } from "@/data/dev-content";

import HomePage from "../page";

export const metadata: Metadata = {
  title: "Orçamento de Site, CRM e ERP",
  description:
    "Monte um briefing para site profissional, landing page, CRM, ERP, dashboard, e-commerce, sistema web ou API sob medida com a Maiawall.",
  keywords: [
    "orçamento site",
    "orçamento desenvolvimento web",
    "contratar desenvolvedor web",
    "CRM sob medida",
    "ERP sob medida",
    "sistema web sob medida",
    "Wallace Maia",
    "Maiawall",
  ],
  alternates: {
    canonical: `${site.url}/start-project`,
  },
  openGraph: {
    url: `${site.url}/start-project`,
    title: "Orçamento de Site, CRM e ERP | Maiawall",
    description:
      "Monte seu projeto web com a Maiawall: sites, landing pages, CRM, ERP, dashboards, e-commerces, sistemas e APIs sob medida.",
  },
};

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
