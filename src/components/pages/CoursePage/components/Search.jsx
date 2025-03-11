import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Radio } from "antd";
import Sider from "antd/es/layout/Sider";
import { filterCourse } from "../../../../service/CourseService";
import debounce from "lodash.debounce"; // Thêm debounce

export const Search = ({
  setKeyword,
  setCourses,
  setTotalPages,
  setTotalElements,
}) => {
  const [level, setLevel] = useState([]);
  const [type, setType] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [duration, setDuration] = useState(null);
  const [countSearch, setCountSearch] = useState(0);
  const isFirstRender = useRef(true);

  // ✅ Dùng useCallback để tránh re-create function
  const handleCheckboxChange = useCallback((setState, value) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }, []);

  // ✅ Dùng useMemo để chỉ thay đổi khi filter thực sự thay đổi
  const filters = useMemo(() => {
    let filterList = [];
    if (level.length) filterList.push(...level.map((l) => `courseLevel:${l}`));
    if (type.length) filterList.push(...type.map((t) => `typeCourse:${t}`));
    if (minPrice) filterList.push(`points>${minPrice}`);
    if (maxPrice) filterList.push(`points<${maxPrice}`);
    if (duration) {
      if (duration === "<5") filterList.push("duration<5");
      else if (duration === ">60") filterList.push("duration>60");
      else {
        const [min, max] = duration.split("-");
        filterList.push(`duration>${min}`, `duration<${max}`);
      }
    }
    return filterList;
  }, [level, type, minPrice, maxPrice, duration]);

  // ✅ Hàm fetch API chỉ được gọi khi filters thay đổi, debounce để tối ưu performance
  const fetchFilteredCourses = useCallback(
    debounce(async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      const queryString = filters.join(",");
      console.log("Search Query:", queryString);

      try {
        const response = await filterCourse("id", queryString);
        const { result, totalPages, totalElements } = response.data;
        setCourses(result);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (error) {
        console.error(error);
      }
    }, 100), // ✅ Chỉ gọi API sau 500ms khi người dùng ngừng thao tác
    [filters]
  );

  useEffect(() => {
    fetchFilteredCourses();
  }, [fetchFilteredCourses]);

  // ✅ Xóa bộ lọc
  const clearFilter = () => {
    setLevel([]);
    setType([]);
    setMinPrice(0);
    setMaxPrice(0);
    setDuration(null);
    setKeyword("");
  };
  return (
    <Sider
      width={"25%"}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#001529",
        padding: "20px",
        fontFamily: `"Poppins", sans-serif`,
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <FilterOutlined style={{ fontSize: "22px", color: "#1890ff" }} />
        <span style={{ fontSize: "20px", fontWeight: "600", color: "#ffffff" }}>
          Filter{" "}
          <Button type="primary" style={{ borderRadius: "50%" }}>
            {countSearch}
          </Button>
        </span>

        <Button
          onClick={clearFilter}
          type="primary"
          danger
          style={{ borderRadius: "8px" }}
        >
          Clear
        </Button>
      </div>
      {/* Search */}
      <div className="mb-4">
        <span className="filter-title">Search</span>
        <Input
          className="mt-2"
          placeholder="Search..."
          onChange={(e) => setKeyword(e.target.value)}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
      </div>
      {/* Level */}
      <div className="mb-4">
        <span className="filter-title">Level</span>
        <div className="d-flex flex-column gap-3 mt-2">
          {["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"].map((lvl) => (
            <Checkbox
              key={lvl}
              className="filter-checkbox"
              checked={level.includes(lvl)}
              onChange={() => handleCheckboxChange(setLevel, lvl)}
            >
              {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
            </Checkbox>
          ))}
        </div>
      </div>
      <hr className="filter-divider" /> {/* Thêm dấu ngăn cách */}
      {/* Type */}
      <div className="mb-4">
        <span className="filter-title">Type</span>
        <div className="d-flex flex-column gap-3 mt-2">
          {["CAREER", "SKILL", "CERTIFICATE", "COURSE"].map((t) => (
            <Checkbox
              key={t}
              className="filter-checkbox"
              checked={type.includes(t)}
              onChange={() => handleCheckboxChange(setType, t)}
            >
              {t}
            </Checkbox>
          ))}
        </div>
      </div>
      <hr className="filter-divider" /> {/* Thêm dấu ngăn cách */}
      {/* Duration */}
      <div className="mb-4">
        <span className="filter-title">Duration</span>
        <div className="d-flex flex-column gap-3 mt-2">
          {[
            { label: "Less than 5 hours", value: "<5" },
            { label: "5 - 10 hours", value: "5-10" },
            { label: "10 - 20 hours", value: "10-20" },
            { label: "20 - 60 hours", value: "20-60" },
            { label: "More than 60 hours", value: ">60" },
          ].map((d) => (
            <Radio
              key={d.value}
              className="filter-radio"
              checked={duration === d.value}
              onChange={() => setDuration(d.value)}
            >
              {d.label}
            </Radio>
          ))}
        </div>
      </div>
      {/* Custom CSS */}
    </Sider>
  );
};
