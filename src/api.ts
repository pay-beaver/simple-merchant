import {
  MyMerchantDomain,
  ServerUrl,
} from "./constants";

export async function getIsUserActive(
  userId: string
): Promise<boolean> {
  const response = await fetch(
    `${ServerUrl}/is_active/merchant/${MyMerchantDomain}/userid/${userId}`
  );

  return await response.json();
}
