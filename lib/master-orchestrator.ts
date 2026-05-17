import {
  AGENT_COUNT,
  AGENT_DEFINITIONS,
  DEPARTMENT_KEYWORDS,
  DEPARTMENT_TOOL_ACCESS,
  DEPARTMENTS,
  type AgentDefinition,
  type Department,
  getAgentById,
  getDepartmentCounts,
  getAgentsByDepartment,
} from './agent-registry';

type OrchestrationInput = {
  input: string;
  requestedTools?: string[];
  channel?: string;
};

type OrchestrationEvent = {
  id: string;
  input: string;
  department: Department;
  agentId: string;
  agentName: string;
  requestedTools: string[];
  allowedTools: string[];
  blockedTools: string[];
  createdAt: string;
};

const globalForOrchestrator = globalThis as typeof globalThis & {
  clubOrchestratorMemory?: {
    events: OrchestrationEvent[];
  };
};

const memory = globalForOrchestrator.clubOrchestratorMemory ?? { events: [] as OrchestrationEvent[] };
globalForOrchestrator.clubOrchestratorMemory = memory;

function normalize(value: string) {
  return value.toLowerCase();
}

function scoreText(text: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 1 : 0), 0);
}

function pickDepartment(text: string): Department {
  const scores = DEPARTMENTS.map((department) => ({
    department,
    score: scoreText(text, DEPARTMENT_KEYWORDS[department]),
  }));
  scores.sort((left, right) => right.score - left.score || DEPARTMENTS.indexOf(left.department) - DEPARTMENTS.indexOf(right.department));
  return scores[0]?.score ? scores[0].department : 'Executive';
}

function pickAgent(department: Department, text: string): AgentDefinition {
  const candidates = getAgentsByDepartment(department);
  const ranked = candidates.map((agent) => ({
    agent,
    score: scoreText(text, [agent.name.toLowerCase(), agent.id.toLowerCase(), ...agent.tags.map((tag) => tag.toLowerCase())]),
  }));
  ranked.sort((left, right) => right.score - left.score || left.agent.name.localeCompare(right.agent.name));
  return ranked[0]?.score ? ranked[0].agent : candidates[0];
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function recordEvent(event: OrchestrationEvent) {
  memory.events.unshift(event);
  memory.events = memory.events.slice(0, 25);
  return event;
}

export function routeTask(params: OrchestrationInput) {
  const input = params.input.trim();
  const normalized = normalize(input);
  const department = pickDepartment(normalized);
  const agent = pickAgent(department, normalized);
  const requestedTools = unique((params.requestedTools ?? []).map((tool) => tool.trim()).filter(Boolean));
  const allowedTools = unique(agent.toolAccess);
  const blockedTools = requestedTools.filter((tool) => !allowedTools.includes(tool));
  const event = recordEvent({
    id: crypto.randomUUID(),
    input,
    department,
    agentId: agent.id,
    agentName: agent.name,
    requestedTools,
    allowedTools,
    blockedTools,
    createdAt: new Date().toISOString(),
  });

  return {
    ready: true,
    department,
    agent,
    requestedTools,
    allowedTools,
    blockedTools,
    routingReason: department === 'Executive' ? 'No stronger department signal found, defaulting to executive coordination.' : 'Matched ' + department.toLowerCase() + ' keywords.',
    memoryScope: agent.memoryScope,
    event,
  };
}

export function getLaunchOverview() {
  return {
    ready: true,
    launchName: 'AI Infrastructure launch',
    agentCount: AGENT_COUNT,
    departments: getDepartmentCounts(),
    recentEvents: memory.events.slice(0, 10),
    totalEvents: memory.events.length,
    departmentOrder: DEPARTMENTS,
    toolMatrix: Object.fromEntries(DEPARTMENTS.map((department) => [department, DEPARTMENT_TOOL_ACCESS[department]])),
  };
}

export function getAgentDirectory() {
  return AGENT_DEFINITIONS;
}

export function getRecentEvents(limit = 10) {
  return memory.events.slice(0, limit);
}

export function getAgentMemory(agentId: string) {
  return memory.events.filter((event) => event.agentId === agentId);
}

export function getAgentDetails(agentId: string) {
  return getAgentById(agentId);
}
