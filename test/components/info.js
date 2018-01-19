/* eslint-env mocha */
import React from "react"
import expect from "expect"
import { render } from "enzyme"
import { fromJS } from "immutable"
import Info from "components/info"

describe("Info component", function() {
  describe("API definition link", function() {
    it("links to absolute API definition URLs correctly", function() {
      const props = {
        getComponent: () => () => null,
        info: fromJS({}),
        url: "http://petstore.swagger.io/v2/swagger.json"
      }
      const el = render(<Info {...props} />)
      expect(el.find("a").first().attr("href")).toEqual(props.url)
    })
    it("links to relative API definition URLs correctly", function() {
      const props = {
        getComponent: () => () => null,
        info: fromJS({}),
        url: "/this/is/a/relative-url.json"
      }
      const el = render(<Info {...props} />)
      expect(el.find("a").first().attr("href")).toEqual(props.url)
    })
    it("filters out likely XSS links correctly", function() {
      const props = {
        getComponent: () => () => null,
        info: fromJS({}),
        url: "javascript:alert(2)"
      }
      const el = render(<Info {...props} />)
      expect(el.find("a").first().attr("href")).toEqual(`about:blank`)
    })
  })
})

function returnsNull() {
  return null
}
