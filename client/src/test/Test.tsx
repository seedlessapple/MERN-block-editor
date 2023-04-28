import { PUBLIC_generateRandomId } from "editor/functions/functions";
import { TContainer } from "editor/types/editor.type";

const dummyContent: TContainer[] = [
  {
    type: "container",
    id: PUBLIC_generateRandomId(12),
    properties: {
      stack: "vertical",
    },
    data: [
      {
        id: PUBLIC_generateRandomId(12),
        type: "block-text",
        text: [],
      },
      {
        id: PUBLIC_generateRandomId(12),
        type: "block-input",
      },
      {
        type: "container",
        id: PUBLIC_generateRandomId(12),
        properties: {
          stack: "vertical",
        },
        data: [
          {
            type: "container",
            id: PUBLIC_generateRandomId(12),
            properties: {
              stack: "horizontal",
            },
            data: [
              {
                id: PUBLIC_generateRandomId(12),
                type: "block-text",
                text: [],
              },
              {
                id: "idfor",
                type: "block-input",
                properties: {
                  required: true,
                  placeholder: "input",
                  defaultText: "input a value",
                },
              },
              {
                id: PUBLIC_generateRandomId(12),
                type: "block-input",
              },
              {
                id: PUBLIC_generateRandomId(12),
                type: "block-input",
              },
            ],
          },
        ],
      },
    ],
  },
];

function Test() {
  const mapLayers = (
    data: TContainer["data"] | TContainer[],
    locationArray?: Array<string>
  ): JSX.Element[] => {
    const depths = locationArray ? locationArray.length : 0;
    return data.map((item) => {
      switch (item.type) {
        case "container":
          return (
            <div
              key={item.id}
              style={{
                paddingLeft: depths * 12 + "px",
              }}
              onClick={(e) => {
                e.target === e.currentTarget && console.log(locationArray);
              }}
            >
              container
              {mapLayers(
                item.data,
                locationArray ? [...locationArray, item.id] : [item.id]
              )}
            </div>
          );
        case "block-text":
          return (
            <div
              key={item.id}
              style={{
                paddingLeft: depths * 12 + "px",
              }}
              onClick={(e) => {
                e.target === e.currentTarget && console.log(locationArray);
              }}
            >
              text
            </div>
          );
        case "block-input":
          return (
            <div
              key={item.id}
              style={{
                paddingLeft: depths * 12 + "px",
              }}
              onClick={(e) => {
                e.target === e.currentTarget && console.log(locationArray);
              }}
            >
              input
            </div>
          );
        case "block-select":
          return (
            <div
              key={item.id}
              style={{
                paddingLeft: depths * 12 + "px",
              }}
              onClick={(e) => {
                e.target === e.currentTarget && console.log(locationArray);
              }}
            >
              select
            </div>
          );

        default:
          return <></>;
      }
    });
  };

  return <div>{mapLayers(dummyContent)}</div>;
}

export default Test;
