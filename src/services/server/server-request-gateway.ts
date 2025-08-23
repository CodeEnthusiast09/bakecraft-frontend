import "server-only";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const service = () => {
  return {
    get: async (url: string) => {
      try {
        const res = await fetch(`${baseURL}/${url}`, {
          next: { revalidate: 10 },
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        // Recommendation: handle errors
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error("Failed to fetch data");
        }

        const resolvedData = await Promise.resolve(res.json());

        if (resolvedData?.status) {
          const exactData = resolvedData?.data;

          return exactData;
        } else {
          return resolvedData;
        }
      } catch (error) {
        console.log("errrr", error);
      }
    },
  };
};

export const serverRequestGateway = service();
