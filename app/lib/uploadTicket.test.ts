import { describe, expect, it } from "vitest";
import { signUploadTicket } from "./uploadTicket";

// 與 shared/contracts/upload-ticket.md、document-service tests/unit/test_upload_ticket.py 相同的測試向量
const VECTOR =
  "v1.eyJleHAiOjE3OTAwMDAzMDAsImlhdCI6MTc5MDAwMDAwMCwianRpIjoianRpLTAwMDEiLCJzY29wZSI6InN1Ym1pc3Npb246Y3JlYXRlIiwic3ViIjoiNDIifQ.0MFdll0gO_DY0lTveZrv0RUKKcVuyL73MsBN8IsONX8";

describe("signUploadTicket", () => {
  it("matches the shared test vector (Python verifies the same string)", () => {
    expect(signUploadTicket({ userId: "42", jti: "jti-0001", nowS: 1790000000, secret: "test-secret" })).toBe(VECTOR);
  });
  it("requires a secret", () => {
    expect(() => signUploadTicket({ userId: "1", jti: "j", nowS: 0, secret: "" })).toThrow();
  });
});
