# BUILDER BRIEF — <Project Name>

## Vision _(optional: use for strategic context)_

<1–2 sentences: Strategic destination or longer-term value this project enables>

## Immediate Goal

<One-line description of what we're building>

**Demo**: <Link or "TBD"> | **Target**: <Completion date>

**Length**: Keep this brief very concise (≈≤2 pages). If it grows beyond that, narrow the scope or further distill the content.  
**Structure**: Group related requirements, use cases, and metrics into logical subcategories/themes; treat this template as guidance and adapt it when a different layout is clearer.

## 1. Problem / Opportunity

<2–3 sentences: What pain or opportunity are we addressing? Why does this matter now?>

## 2. Objective & Success

_Choose the table format that best fits your project complexity:_

**Option A: Simple (no subcategories)**
| What we're achieving | How we measure success | Target |
|---|---|---|
|  |  |  |

**Option B: With subcategories (use when clustering related objectives)**
| Subcategory / Theme | What we're achieving | How we measure success | Target |
|---|---|---|---|
|  |  |  |  |

## 3. Scope

_Choose the format that best communicates your scope boundaries:_

**Option A: Simple in/out (single increment)**
| ✅ In Scope | ❌ Out of Scope | Why |
|---|---|---|
|  |  |  |

**Option B: Evolution view (shows progression across increments)**
| Category | This Increment (Alpha/MVP) | Next Increment (Beta/v2) |
|---|---|---|
| User Group |  |  |
| Features |  |  |
| Integration |  |  |

_Group scope items by logical subcategories (e.g., "User Auth", "Billing", "Reporting") when that improves clarity._

## 4. Requirements

_Choose the format that best fits your requirements complexity. Keep this section tight by grouping into logical subcategories when helpful._

**Option A: Simple list (fewer than 5 requirements)**
**Functional (P0 only)**
1. <User must be able to…>
2. <System must…>
3. <Integration must…>

**Option B: Structured table (complex requirements with multiple actors/contexts)**
**Functional (P0 only)**

| # | Capability | Actor | Requirement Details |
|---|---|---|---|
| 1 |  | User / System |  |
| 2 |  | User / System |  |

**Data Requirements _(use when data access is critical to success)_**

| # | Capability | Actor | Requirement Details |
|---|---|---|---|
|  | Access [system] data | System | System must access:<br>• [Data point 1]<br>• [Data point 2]<br>• [Data point 3] |

**Data Source Map _(optional: use when integrating multiple data sources)_**

| Data Type | Source | Notes |
|---|---|---|
| [Data category] | [System/API name] | [Access level, constraints, or context] |

## 5. Approach

**What we're building**
- <UX flow / API design>
- <Key technical choice>
- <Critical dependency>

**Stretch goals _(optional: encouraged but not P0)_**
- <Feature that adds value but isn't blocking>
- <Enhancement that improves UX>

**How to view/test**
- Link: <URL to prototype / branch / environment>
- Authentication: <How to access>
- Test scenarios: <Key flows to verify>

---

## 6. Non-Functional Requirements

Use `Category` to group related non-functional requirements (e.g., "Auth", "Billing", "Observability") and cluster items under shared categories rather than scattering similar themes.

| Category | Requirement | Notes |
|---|---|---|
| Performance |  |  |
| Security |  |  |
| Reliability |  |  |
| Compliance |  |  |

## 7. Risks & Mitigations

| Risk | Impact | Mitigation | Owner |
|---|---|---|
|  |  |  |  |

## 8. Open Questions / Decisions Needed

| Question / Decision | Why it matters | Owner | Due |
|---|---|---|---|
|  |  |  |  |

## 9. Next Increment (Preview)

**Focus**: <What problem/feature slice comes next?>  
**Why**: <Why that's the logical next step>

## 10. Critical References

_Choose the format that best fits your reference complexity:_

**Option A: Simple list (fewer than 4 references)**
- [Architecture Doc](link)
- [API Spec](link)
- [Related PRD](link)

**Option B: Detailed table (many references or access restrictions)**
| Resource | Type | Purpose | Access Level |
|---|---|---|---|
| [Resource name](link) | Knowledge Base / API / Docs / Code | [What it's used for] | Public / Internal / Restricted |

## 11. Evidence & Learning Log

_Choose the format that best communicates your learnings:_

**Option A: Simple narrative (early-stage exploration)**
**What we validated**
- <Key assumption tested>
- <User/partner feedback received>

**What changed our thinking**
- <Insight that shifted approach>
- <Constraint discovered>

**Option B: Structured table (mature project with many learnings)**
| Type | Area | Finding | Impact |
|---|---|---|---|
| **Validated** | [Problem/Timeline/Architecture/etc.] | [What we confirmed] | [What this means for project] |
| **Learning** | [Data Access/Security/MVP Scope/etc.] | [What we discovered] | [How this changed approach/requirements] |
