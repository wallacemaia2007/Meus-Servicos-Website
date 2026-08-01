import type { ContactPayload } from "@/types";

import { httpClient } from "./http-client";

export const contactService = {
  send(payload: ContactPayload) {
    return httpClient.post("/contact", payload);
  },
};
