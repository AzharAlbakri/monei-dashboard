import { paymentsData as mockPayments, kpiData as mockKpis } from "../mockData";

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL;
const API_KEY = process.env.REACT_APP_GRAPHQL_API_KEY;

// Helper function
const fetchGraphQL = async (query: string) => {
  if (!GRAPHQL_URL || !API_KEY) {
    console.warn("No .env detected → using mock data");
    return null;
  }

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error("Network error");

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn("API failed → fallback to mock data", error);
    return null;
  }
};

//
// ✅ KPIs
//
export const getKpis = async () => {
  const query = `
    query {
      chargesDateRangeKPIGraphQL {
        totalPayments
        totalAmount
        averageAmount
      }
    }
  `;

  const data = await fetchGraphQL(query);

  if (data?.chargesDateRangeKPIGraphQL) {
    const apiData = data.chargesDateRangeKPIGraphQL;

    // 🔥 Mapping layer
    return {
      totalPayments: apiData.totalPayments ?? 0,
      totalAmount: apiData.totalAmount ?? 0,
      averageAmount: apiData.averageAmount ?? 0,
    };
  }

  return mockKpis;
};

//
// ✅ Payments
//
export const getPayments = async () => {
  const query = `
    query {
      charges {
        id
        amount
        status
        createdAt
        metadata {
          key
          value
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);

  if (data?.charges) {
    return data.charges;
  }

  return mockPayments;
};
