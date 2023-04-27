import React, { useEffect, useState } from "react";
import style from "editor/editor.module.scss";
import useApi from "editor/hooks/useApi";
import Icon from "editor/assets/Icon";
import { useAlert } from "editor/hooks/useAlert";
import { useError } from "editor/hooks/useError";

const ViewData = ({ id }: { id: string }) => {
  const [data, isLoading, fetchData] = useApi<any[]>();
  const { raiseError } = useError();

  useEffect(() => {
    id &&
      fetchData({
        method: "get",
        url: `database/${id}/data`,
        errorFunc: (error) => {
          raiseError({
            title: "데이터베이스를 불러오는데 실패하였습니다",
            content: error?.response?.data,
          });
        },
      });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [id]);

  return (
    <div className={style.data_container}>
      <div className={style.header}>
        <div className={style.title}>데이터 관리</div>
        <div className={style.actions}>
          <div
            className={style.reload_btn}
            onClick={() => {
              !isLoading &&
                id &&
                fetchData({
                  method: "get",
                  url: `database/${id}/data`,
                  errorFunc: (error) => {
                    raiseError({
                      title: "데이터베이스를 불러오는데 실패하였습니다",
                      content: error?.response?.data,
                    });
                  },
                });
            }}
          >
            {isLoading ? (
              <Icon type={"loading"} className={style.loader} />
            ) : (
              "새로고침"
            )}
          </div>
          <div className={style.btn}>추가</div>
          <select>
            <option value="">10개씩 보기</option>
            <option value="">25개씩 보기</option>
            <option value="">50개씩 보기</option>
          </select>
        </div>
      </div>
      <div className={style.data_list_container}>
        {data?.map((d) => {
          return (
            <div key={d?._id} className={style.data}>
              {Object.keys(d)
                .sort()
                .map((f: any) => {
                  return (
                    <div key={f} className={style.field}>
                      <div>
                        {f} : {JSON.stringify(d[f])}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Database = () => {
  const [data, , fetchData] = useApi<any[]>();
  const [_newDb, , fetchNewDatabase] = useApi<any>();
  const [_newField, , fetchNewField] = useApi<any>();
  const { raiseError } = useError();
  const { createAlert } = useAlert();
  const [currentDatabase, setCurrentDatabase] = useState<any>();
  const [currentTab, setCurrentTab] = useState<"field" | "data" | "settings">(
    "field"
  );
  const [addNewField, setAddNewField] = useState({
    field: "",
    type: "string",
    isLoading: false,
  });
  useEffect(() => {
    fetchData({
      method: "get",
      url: "database",
      errorFunc: (error) => {
        raiseError({
          title: "데이터베이스를 불러오는데 실패하였습니다",
          content: error?.response?.data,
        });
      },
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [_newDb, _newField]);
  useEffect(() => {
    setCurrentDatabase(data?.[0]);
  }, [data]);
  useEffect(() => {
    setAddNewField({
      field: "",
      type: "string",
      isLoading: false,
    });
  }, [currentDatabase]);

  return (
    <div className={style.database_container}>
      <div className={style.sidebar}>
        <div className={style.title}>데이터베이스 관리</div>
        <div className={style.database_items}>
          <div
            className={style.add_database_btn}
            onClick={() =>
              createAlert(
                "데이터베이스 추가",
                async (b, inputValue) => {
                  b &&
                    (await fetchNewDatabase({
                      method: "post",
                      url: "database",
                      data: {
                        _name: inputValue,
                      },
                      errorFunc: (error) => {
                        raiseError({
                          title: "데이터베이스를 생성하는데 실패하였습니다",
                          content: error?.response?.data,
                        });
                      },
                    }));
                },
                {
                  btn_2: "추가",
                  btn_1: "",
                  input: true,
                  inputPlaceholder: "데이터베이스 이름",
                  inputNotEmpty: true,
                }
              )
            }
          >
            추가
          </div>
          {data?.map((d) => {
            return (
              <div
                key={d._name}
                className={style.database_item_container}
                onClick={() => {
                  setCurrentDatabase(d);
                }}
              >
                <div className={style.header}>
                  <Icon
                    type={
                      currentDatabase?._name === d._name
                        ? "folderOpen"
                        : "folder"
                    }
                    height={12}
                    width={12}
                  />
                  <div className={style.name}>{d._name}</div>
                </div>
                {currentDatabase?._name === d._name && (
                  <div className={style.fields}>
                    {d.fields?.map((f: any) => {
                      return (
                        <div key={f.field} className={style.field}>
                          <span className={style.vertical_line}></span>
                          <span className={style.horizontal_line}></span>
                          {f.field}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.database}>
        <div className={`${style.title} ${style.skeleton}`}>
          {currentDatabase?._name}
        </div>
        <div className={style.tab_container}>
          <div className={style.tab_header}>
            <div
              className={`${style.item} ${
                currentTab === "field" ? style.active : ""
              }`}
              onClick={() => setCurrentTab("field")}
            >
              필드
            </div>
            <div
              className={`${style.item} ${
                currentTab === "data" ? style.active : ""
              }`}
              onClick={() => setCurrentTab("data")}
            >
              데이터
            </div>
            <div
              className={`${style.item} ${
                currentTab === "settings" ? style.active : ""
              }`}
              onClick={() => setCurrentTab("settings")}
            >
              설정
            </div>
          </div>
          <div className={style.tab_content}>
            {currentTab === "field" && (
              <div className={style.field_container}>
                <table className={style.table}>
                  <thead>
                    <tr className={style.header_row}>
                      <th className={style.field}>필드</th>
                      <th className={style.type}>타입</th>
                      <th className={style.delete}>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={style.add_row}>
                      <td>
                        <input
                          type="text"
                          className=""
                          value={addNewField.field}
                          onChange={(e) =>
                            setAddNewField((prev) => ({
                              ...prev,
                              field: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <select
                          value={addNewField.type}
                          onChange={(e) =>
                            setAddNewField((prev) => ({
                              ...prev,
                              type: e.target.value,
                            }))
                          }
                        >
                          <option value="string">string</option>
                          <option value="number">number</option>
                          <option value="boolean">boolean</option>
                          {/* <option value="">object</option> 
                        <option value="">array</option>  */}
                        </select>
                      </td>
                      <td>
                        <div
                          className={style.add_btn}
                          onClick={() => {
                            // !addNewField.isLoading && fe
                            if (
                              !addNewField.isLoading &&
                              addNewField.field !== ""
                            ) {
                              setAddNewField((prev) => ({
                                ...prev,
                                isLoading: true,
                              }));
                              fetchNewField({
                                method: "post",
                                url: `database/${currentDatabase._id}/fields`,
                                data: {
                                  field: addNewField.field,
                                  type: addNewField.type,
                                },
                                thenFunc: () =>
                                  setAddNewField({
                                    field: "",
                                    type: "string",
                                    isLoading: false,
                                  }),
                                errorFunc: (error) => {
                                  raiseError({
                                    title: "필드를 생성하는데 실패하였습니다",
                                    content: error?.response?.data,
                                  });
                                  setAddNewField({
                                    field: "",
                                    type: "string",
                                    isLoading: false,
                                  });
                                },
                              });
                            }
                          }}
                        >
                          {addNewField.isLoading ? (
                            <Icon type={"loading"} className={style.loader} />
                          ) : (
                            "추가"
                          )}
                        </div>
                      </td>
                    </tr>
                    {data
                      ?.filter((o) => o._name === currentDatabase?._name)[0]
                      ?.fields.map((f: any) => {
                        return (
                          <tr className={style.row} key={f.field}>
                            <td className={style.field}>{f.field}</td>
                            <td className={style.type}>{f.type}</td>
                            <td className={style.delete}>
                              <div
                                className={style.btn}
                                onClick={() =>
                                  createAlert(
                                    <div
                                      style={{
                                        fontSize: "13px",
                                        textAlign: "center",
                                      }}
                                    >
                                      <span
                                        style={{ color: "var(--accent-8)" }}
                                      >
                                        삭제 후 기존 데이터는 삭제 되지 않습니다
                                      </span>
                                      <br />
                                      <span
                                        style={{ color: "var(--accent-10)" }}
                                      >
                                        삭제를 확인하려면 &nbsp;
                                      </span>
                                      <b>{f.field}</b>

                                      <span
                                        style={{ color: "var(--accent-10)" }}
                                      >
                                        &nbsp; 를 입력하세요
                                      </span>
                                    </div>,
                                    () => {},
                                    {
                                      btn_1: "",
                                      btn_2: "삭제",
                                      input: true,
                                      inputPlaceholder: f.field,
                                      inputMatch: f.field,
                                    }
                                  )
                                }
                              >
                                삭제
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
            {currentTab === "data" && currentDatabase?._id && (
              <ViewData id={currentDatabase?._id} />
            )}
            {currentTab === "settings" && currentDatabase?._id && (
              <div className={style.settings_container}>
                <div className={style.category}>
                  <div className={style.title}>삭제</div>
                  <div className={style.settings_item}>
                    <div className={style.content}>
                      <div className={style.text}>데이터베이스 삭제</div>
                      <div className={style.description}>
                        데이터베이스를 삭제합니다.
                      </div>
                    </div>
                    <div
                      className={style.btn}
                      onClick={() => {
                        createAlert(
                          <div
                            style={{
                              fontSize: "13px",
                              textAlign: "center",
                            }}
                          >
                            <span style={{ color: "var(--accent-8)" }}>
                              삭제시 되돌릴 수 없습니다.
                            </span>
                            <br />
                            <span style={{ color: "var(--accent-10)" }}>
                              삭제를 확인하려면 &nbsp;
                            </span>
                            <b>{currentDatabase?._name}</b>

                            <span style={{ color: "var(--accent-10)" }}>
                              &nbsp; 를 입력하세요
                            </span>
                          </div>,
                          () => {},
                          {
                            btn_1: "",
                            btn_2: "삭제",
                            input: true,
                            inputPlaceholder: currentDatabase?._name,
                            inputMatch: currentDatabase?._name,
                          }
                        );
                      }}
                    >
                      데이터베이스 삭제
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
