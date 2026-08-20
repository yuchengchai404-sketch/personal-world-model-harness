# Context Strategy

## Context is selected, not accumulated

PWM 不把“模型能装下多少”视为 Context Engineering 的目标。目标是让 Agent 在正确时间看到正确的信息，并明确哪些信息不应进入本轮推理。

## Default load order

1. `CORE.md`：任务不可违反的稳定边界；
2. `USER.md`：确实会改变解释或互动方式的稳定偏好；
3. `STATE.md`：当前任务、开放问题和 handoff；
4. 一个 primary Skill：本轮主要工作流；
5. 能实质改变答案的最少 Source / Note / Insight / Model / Case。

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

这些问题优先通过减少和分层 Context 解决，而不是单纯增加窗口长度。
