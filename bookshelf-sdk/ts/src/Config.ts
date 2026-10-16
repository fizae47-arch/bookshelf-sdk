
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Bookshelf',
        slug: "bookshelf",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "{base}",

    server: {
      "base": "",
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        book: {
        },
  
    }
  }


  entity = {
    "book": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "book",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/books",
              "segments": [
                {
                  "lit": "books"
                }
              ],
              "parts": [
                "books"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/books/{bookId}",
              "segments": [
                {
                  "lit": "books"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "books",
                "{id}"
              ],
              "rename": {
                "param": {
                  "bookId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "bookId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/books",
              "segments": [
                {
                  "lit": "books"
                }
              ],
              "parts": [
                "books"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/books/{bookId}",
              "segments": [
                {
                  "lit": "books"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "books",
                "{id}"
              ],
              "rename": {
                "param": {
                  "bookId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "bookId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/books/{bookId}",
              "segments": [
                {
                  "lit": "books"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "books",
                "{id}"
              ],
              "rename": {
                "param": {
                  "bookId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "bookId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

