export let ServerUrl: string;
if (
  !process.env.NODE_ENV ||
  process.env.NODE_ENV === "development"
) {
  ServerUrl = "http://127.0.0.1:8000";
} else {
  ServerUrl = "https://api.paybeaver.xyz";
}

export const MyMerchantDomain = "paybeaver.xyz";
