/**
 * Miuse Payment Gateway - Client-side service
 *
 * All calls go through `/api/miuse/...` which proxies to the Miuse API
 * server-side, keeping the API key hidden from the browser.
 */

const BASE_API_URL = "/api/miuse";

// ── Types ─────────────────────────────────────────────────────────────

export interface MiusePixRequest {
  amount: number;
  customer: {
    id: string;
    name: string;
  };
}

/** Matches the real Miuse API response for PIX creation */
export interface MiusePixResponse {
  payment_id: string;
  pix_copia_e_cola: string;
}

/** Matches the real Miuse API response for payment status */
export interface MiusePaymentStatus {
  payment_id: string;
  status: "pending" | "approved" | "expired" | "cancelled";
  [key: string]: unknown; // other fields Miuse may return
}

// ── API calls ─────────────────────────────────────────────────────────

/**
 * Create a PIX payment via Miuse gateway.
 *
 * @param data - Object with `total` (number) and `customer.name` (string)
 * @returns The Miuse API response with `payment_id` and `pix_copia_e_cola`
 */
export async function createPixSale(data: {
  total: number;
  customer: { name: string };
}): Promise<MiusePixResponse> {
  const url = `${BASE_API_URL}/payments/pix`;

  const payload: MiusePixRequest = {
    amount: Number((data.total - 0.3).toFixed(2)),
    customer: {
      id: "Tiktok",
      name: data.customer.name,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Erro ao gerar PIX"
    );
  }

  return result as MiusePixResponse;
}

/**
 * Check the payment status of a given payment ID.
 *
 * @param paymentId - The Miuse payment ID returned from `createPixSale`
 * @returns Payment status object, or `null` on failure
 */
export async function checkPaymentStatus(
  paymentId: string
): Promise<MiusePaymentStatus | null> {
  const url = `${BASE_API_URL}/payments/status/${paymentId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return (await response.json()) as MiusePaymentStatus;
  } catch {
    return null;
  }
}
