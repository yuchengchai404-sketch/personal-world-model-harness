# Publication Checklist

首次公开前逐项检查：

## Privacy

- [ ] 不含真实 USER / STATE；
- [ ] 不含姓名、对象、家人、雇主、群聊或现实组织细节；
- [ ] 不含联系方式、账号、Token、私钥或环境变量；
- [ ] 不含本地绝对路径；
- [ ] 不含 Obsidian `workspace.json`；
- [ ] Git 历史从脱敏版本开始。

## Copyright

- [ ] 不含无再分发许可的第三方 PDF；
- [ ] 不复制付费文章、课程或完整对话；
- [ ] 示例引用有来源和合理长度；
- [x] LICENSE 已由项目 Owner 确认并采用全仓统一 MIT License。

## Claims

- [ ] `testing` 没有被写成最佳实践；
- [ ] 真实验证与设计推断明确区分；
- [ ] Demo 标明经过脱敏或合成；
- [ ] 不宣称系统能够自动判断真理；
- [ ] 不把 Markdown 模板包装成完全自治 Agent。

## Repository

- [ ] README 能解释问题、架构、运行方式和边界；
- [ ] Template 可以独立复制；
- [ ] 至少一个 Demo 可从输入走到 STATE 更新；
- [ ] `.gitignore` 覆盖设备状态与私有导出；
- [ ] 先创建 Private Repository 并复核；
- [ ] Owner 最终确认后再转 Public。
