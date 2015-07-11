import {
  ruleTester,
  warningFreeBasics
} from "../../../testUtils"
import rule, { ruleName, messages } from ".."

const testRule = ruleTester(rule, ruleName)

testRule("always", tr => {
  warningFreeBasics(tr)

  tr.ok("@media (max-width: 600px) {}")
  tr.ok("@media screen and (color) , projection and (color) {}")
  tr.ok("@media screen and (color) ,  projection and (color) {}")
  tr.ok("@media screen and (color) ,\nprojection and (color) {}")
  tr.ok("@media screen and (color) ,\r\nprojection and (color) {}", "CRLF")

  tr.notOk("@media screen and (color), projection and (color)", messages.expectedBefore())
  tr.notOk("@media screen and (color)  , projection and (color)", messages.expectedBefore())
  tr.notOk("@media screen and (color)\n, projection and (color)", messages.expectedBefore())
  tr.notOk("@media screen and (color)\r\n, projection and (color)", messages.expectedBefore(), "CRLF")
  tr.notOk("@media screen and (color)\t, projection and (color)", messages.expectedBefore())
})

testRule("never", tr => {
  warningFreeBasics(tr)

  tr.ok("@media (max-width: 600px) {}")
  tr.ok("@media screen and (color),projection and (color) {}")
  tr.ok("@media screen and (color), projection and (color) {}")
  tr.ok("@media screen and (color),\nprojection and (color) {}")
  tr.ok("@media screen and (color),\r\nprojection and (color) {}", "CRLF")

  tr.notOk("@media screen and (color) , projection and (color)", messages.rejectedBefore())
  tr.notOk("@media screen and (color)  , projection and (color)", messages.rejectedBefore())
  tr.notOk("@media screen and (color)\n, projection and (color)", messages.rejectedBefore())
  tr.notOk("@media screen and (color)\r\n, projection and (color)", messages.rejectedBefore(), "CRLF")
  tr.notOk("@media screen and (color)\t, projection and (color)", messages.rejectedBefore())
})

testRule("always-single-line", tr => {
  warningFreeBasics(tr)

  tr.ok("@media screen and (color) ,projection and (color) {}")
  tr.ok("@media screen and (color) ,projection and (color) {\n}", "single-line list, multi-line block")
  tr.ok("@media screen and (color) ,projection and (color) {\r\n}", "single-line list, multi-line block and CRLF")
  tr.ok("@media screen and (color),\nprojection and (color) {}", "ignore multi-line")
  tr.ok("@media screen and (color),\r\nprojection and (color) {}", "ignore multi-line", "CRLF")

  tr.notOk("@media screen and (color), projection and (color) {}", messages.expectedBeforeSingleLine())
  tr.notOk(
    "@media screen and (color), projection and (color) {\n}",
    messages.expectedBeforeSingleLine(),
    "single-line list, multi-line block"
  )
  tr.notOk(
    "@media screen and (color), projection and (color) {\r\n}",
    messages.expectedBeforeSingleLine(),
    "single-line list, multi-line block and CRLF"
  )
})

testRule("never-single-line", tr => {
  warningFreeBasics(tr)

  tr.ok("@media screen and (color), projection and (color) {}")
  tr.ok("@media screen and (color), projection and (color) {\n}", "single-line list, multi-line block")
  tr.ok("@media screen and (color), projection and (color) {\r\n}", "single-line list, multi-line block and CRLF")
  tr.ok("@media screen and (color)\n,projection and (color) {}", "ignore multi-line")
  tr.ok("@media screen and (color)\r\n,projection and (color) {}", "ignore multi-line and CRLF")

  tr.notOk("@media screen and (color) ,projection and (color) {}", messages.rejectedBeforeSingleLine())
  tr.notOk(
    "@media screen and (color) ,projection and (color) {\n}",
    messages.rejectedBeforeSingleLine(),
    "single-line list, multi-line block"
  )
  tr.notOk(
    "@media screen and (color) ,projection and (color) {\r\n}",
    messages.rejectedBeforeSingleLine(),
    "single-line list, multi-line block and CRLF"
  )
})
