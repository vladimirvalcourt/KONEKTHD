import assert from "node:assert/strict"
import test from "node:test"
import { isNationwideProvider, providerCategory, providerMatches, providerStateCodes, safeExternalUrl, splitProvidersForState } from "../src/providerDiscovery.js"

const providers = [
  { id: "fl", name: "Miami Family Clinic", category: "Healthcare", specialty: "Primary care", address: "Miami, FL 33101", services: ["family medicine"] },
  { id: "multi", name: "Remote Therapy", category: "Healthcare", address: "Telehealth service in CO, FL, MN, OR, and WA" },
  { id: "national", name: "National Legal Help", category: "Legal", address: "Nationwide remote service" },
]

test("extracts state coverage without turning nationwide records into local matches", () => {
  assert.deepEqual(providerStateCodes(providers[1]), ["CO", "FL", "MN", "OR", "WA"])
  assert.equal(isNationwideProvider(providers[2]), true)
  assert.deepEqual(splitProvidersForState(providers, "FL").local.map(({ id }) => id), ["fl", "multi"])
  assert.deepEqual(splitProvidersForState(providers, "FL").nationwide.map(({ id }) => id), ["national"])
})

test("searches provider-facing fields and normalizes categories", () => {
  assert.equal(providerCategory(providers[0]), "healthcare")
  assert.equal(providerMatches(providers[0], { category: "healthcare", query: "family medicine" }), true)
  assert.equal(providerMatches(providers[0], { category: "legal", query: "" }), false)
})

test("only permits http and https destinations", () => {
  assert.equal(safeExternalUrl("example.com"), "https://example.com/")
  assert.equal(safeExternalUrl("javascript:alert(1)"), null)
})
