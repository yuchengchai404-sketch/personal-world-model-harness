# Task Routing / 任务路由

## 中文

### 它解决的不是“窗口更大”，而是“工作集不再混在一起”

一个超长期系统会同时存在学习、研究、项目、现实决策和系统治理。如果这些内容只依赖单一聊天记录，Context 越长，任务边界越模糊；如果完全分散到多个会话，又容易丢失全局当前状态。

PWM 使用两层状态解决这个张力：

- `STATE.md` 是全局控制面，只允许一个 substantive Current Stream；
- Topic Note 的 Resume Block 是局部恢复点，保存该主题的最后结论、开放问题、最小 Context 和边界。

会话或任务可以作为不同主题的“视图”，Vault 才是跨会话的持久层。Runtime 不靠重读完整聊天恢复，而是从 STATE 与目标 Resume Block 编译本轮工作集。

### 路由决策

```mermaid
flowchart TD
    I["New input"] --> Q{"Where does it belong?"}
    Q -->|"Current topic"| C["Continue Current Stream"]
    Q -->|"Existing parked topic"| P["Checkpoint current topic"]
    P --> S["Switch STATE Current Stream"]
    S --> R["Load target Resume Block"]
    Q -->|"New / ambiguous / cross-topic"| H["Keep in Hub / entry task"]
    Q -->|"Governance"| G["Route to system governance"]
    C --> M["Load minimum context"]
    R --> M
    H --> M
    G --> M
```

切换必须先 checkpoint，再修改 `STATE.md`。直接回复一个 parked topic 表示用户想切换，但不允许 Runtime 忽略当前主题的恢复责任。

### 为什么它同时改善 Context 与多任务视图

- 每个主题只携带自己的局部恢复 Context，减少长历史噪声；
- STATE 明确唯一当前流，避免两个主题同时改写共享资产；
- Parked Streams 保留多任务地图，Topic Note 保留每个任务的局部进度；
- Hub 只承担入口与分流，不成为所有主题的巨型会话。

### 边界与证据状态

- **已在原始 PWM 中运行**：STATE + Topic Resume 的恢复、Hub 到已有主题的路由和切换前 checkpoint；
- **仍在 testing**：不同 Agent Runtime 是否能一致执行自动跳转、跨任务消息转交和并发约束；
- **不提供**：独立任务管理 UI、无限 Context、冲突自动合并，或多个 Current Stream 的安全并行写入。

任务路由是一项治理协议。支持任务 / 会话操作的平台可以把它自动化；不支持的平台仍可手工执行同一状态转换。

---

## English

### The goal is not a larger window, but separate working sets

A long-lived system contains learning, research, projects, real decisions, and system governance at the same time. One ever-growing chat blurs task boundaries; fully separate chats lose global state.

PWM uses two state layers:

- `STATE.md` is the global control plane and names exactly one substantive Current Stream;
- each Topic Note has a Resume Block containing that topic's last conclusion, open question, minimum context, and boundaries.

Tasks or conversations can act as topic views, while the Vault remains the persistent cross-session layer. Recovery compiles a working set from STATE and the target Resume Block instead of replaying the full transcript.

### Routing sequence

New input is classified as current-topic continuation, existing parked topic, new / ambiguous / cross-topic input for the Hub, or system governance. A topic switch follows this order:

```text
checkpoint current topic
        → update STATE Current Stream
        → load target Resume Block
        → select one primary Skill
        → load minimum relevant knowledge
```

A direct reply inside a parked topic signals intent to switch. It does not remove the runtime's duty to preserve a recovery point for the current topic first.

### Why this helps both context and multi-task work

- Each topic carries only its local recovery context;
- STATE keeps one current stream, preventing concurrent mutation of shared assets;
- Parked Streams provide the global task map while Topic Notes preserve local progress;
- the Hub remains an intake and routing layer rather than becoming one giant conversation.

### Boundaries and evidence status

- **Running in the originating PWM**: STATE + Topic Resume recovery, Hub-to-existing-topic routing, and checkpoint-before-switch;
- **Still testing**: consistent automatic navigation, message handoff, and concurrency control across different agent runtimes;
- **Not provided**: a standalone task UI, unlimited context, automatic conflict merging, or safe concurrent writes from multiple Current Streams.

Task routing is a governance protocol. Platforms with task / conversation controls can automate it; other runtimes can perform the same state transition manually.
