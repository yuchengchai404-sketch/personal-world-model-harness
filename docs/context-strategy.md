# Context Strategy

## Context is selected, not accumulated

PWM 不把“模型能装下多少”视为 Context Engineering 的目标。目标是让 Agent 在正确时间看到正确的信息，并明确哪些信息不应进入本轮推理。

## Default load order

1. `CORE.md`：任务不可违反的稳定边界；
2. `USER.md`：确实会改变解释或互动方式的稳定偏好；
3. `STATE.md`：当前任务、开放问题和 handoff；
4. 一个 primary Skill：本轮主要工作流；
5. 能实质改变答案的最少 Source / Note / Insight / Model / Case。

开始加载第 4、5 项之前，Runtime 先完成任务路由。路由错误会让“最小 Context”变成最小但错误的 Context。

## Route before retrieval

新输入先分为两层：

1. **认知工作**：学习、问题探索、现实案例、决策或 Insight / Model 验证；
2. **系统维护**：架构、Runtime 治理、配置、迁移、Public Edition 或发布。

系统维护留在 Hub，按需加载直接相关的系统文件，不替换认知 Current Stream，也不强制加载认知主题材料。认知输入再细分为：

1. 明确继续 Current Stream：留在当前主题；
2. 明确属于已有 Parked Stream：先检查当前主题恢复点，再切换；
3. 新主题、跨主题或归属不清：留在 Hub / 入口层澄清。

切换时遵守一个顺序：

```text
checkpoint current topic
        → update STATE Current Stream
        → load target Resume Block
        → select exactly one primary Skill
        → load minimum relevant knowledge
```

只有认知主题切换执行上述流程。系统维护结束后，只在必要时更新 System Pending 或 History，认知 Current Stream 保持不变。

路由协议减少跨主题污染和恢复成本，但不能保证所有 Runtime 都提供会话列表、自动跳转或 Hub UI。平台能力与 PWM 的持久状态协议应分开评价。详见 [Task Routing](task-routing.md)。

## Context selection test

加载一个文件前问：

- 它会改变本轮回答、判断或动作吗？
- 它是否比当前 Context 中已有内容更新或更权威？
- 如果不加载，最可能出现什么具体错误？
- 它属于当前状态，还是仅属于历史审计？

如果无法说明具体增益，默认不加载。

## Conflict order

出现冲突时，不静默合并：

1. 明确指出冲突；
2. 区分稳定规则、用户偏好、当前状态和历史记录；
3. 当前进度以 STATE 为准；
4. 对核心规则和 Model 的实质修改请求用户批准；
5. 保留旧判断的审计线索。

## Blueprint boundary

完整 Blueprint 只在系统重构、规则冲突诊断或架构升级时读取。普通学习、研究或讨论不应为架构文档支付全量 Context 成本。

## Failure signals

- Agent 能找到大量资料，却找不到当前任务；
- 历史 Note 覆盖了最新 STATE；
- 多个 Skill 同时给出冲突流程；
- 用户背景被机械塞进每个回答；
- 为防止遗忘而默认读取整个 Vault。
- 看到另一个主题的关键词就直接加载其资料，却没有先检查 STATE 与恢复点。
- 为了修改 README、配置或发布仓库，先把系统维护包装成认知 Topic、切走 Current Stream 并执行完整 Promotion Audit。

这些问题优先通过减少和分层 Context 解决，而不是单纯增加窗口长度。
