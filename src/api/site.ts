import { SiteType } from "@/model/site";
import { getFromEmployeeServer } from "./base";

export async function getAllSites(): Promise<SiteType[]> {
  const response = await getFromEmployeeServer("/site/get/all");

  return response.data;
}

export async function getSite(site: string): Promise<SiteType> {
  const response = await getFromEmployeeServer(`/site/get/${site}`);

  return response.data;
}
