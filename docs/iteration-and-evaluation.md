# Iteration and Evaluation

## Evaluation stance

PWM 不用“文件更多”“结构更完整”证明有效。系统至少应在真实运行中改善：

- 跨会话恢复；
- Context 相关性；
- 用户原话与 AI 推断的归属清晰度；
- 误解、隐藏假设和反例的发现；
- Insight 的跨领域复用；
- 现实判断或行动结果；
- 维护时间与认知收益的比例。

## Evidence levels

| Level | Requirement |
|---|---|
| `validated-in-use` | 在多个真实回合中反复产生可观察价值 |
| `supported-by-failure` | 有明确失败案例说明旧设计为何需要修正 |
| `testing` | 已形成机制和验证方法，但样本不足 |
| `candidate` | 可能跨场景成立，尚未满足 Model Gate |

## Example iteration chain

```text
Failure
Topic closed with useful material left only in Note
        ↓
Change 1
Add mandatory Promotion Audit
        ↓
New failure
Audit finds claims but misses a reusable decision workflow
        ↓
Change 2
Scan multiple artifact types, not only propositions
        ↓
New risk
Broader scan may over-produce Insights
        ↓
Current test
Evaluate independent retrieval value and maintenance cost
```

真正的迭代记录应保留：

- 触发问题；
- 系统修改；
- 修改理由；
- 预期收益；
- 潜在副作用；
- 后续验证结果。

## Stop condition

如果迭代记录本身的维护成本长期高于诊断价值，应缩减或停止。History 是诊断层，不是默认 Runtime Context。

## Current limitations

- 真实复用样本仍少；
- Note → Insight 取舍依赖判断；
- 没有自动化评测集；
- 尚未证明该 Harness 对不同用户同样有效；
- Obsidian + workspace-aware Agent 的组合仍需要人工维护。

这些限制是项目的一部分，不应从作品集中隐藏。
