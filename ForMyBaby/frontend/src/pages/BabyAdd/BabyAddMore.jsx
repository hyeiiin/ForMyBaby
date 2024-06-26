import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BabyAdd.css";
import { useUserStore } from "../../stores/UserStore";
import { addBabyInfo } from "../../api/userApi";
import BabyGender from "../../api/BabyGender";
import { FaCamera } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

const BabyAddPage = () => {
  const { id, babyList, setBabyList } = useUserStore();

  const [babyName, setBabyName] = useState("");
  const [babyGender, setBabyGender] = useState("");
  const [babyBirthDate, setBabyBirthDate] = useState("");
  const [babyPhoto, setBabyPhoto] = useState(null);
  const [babyPhotoPreview, setBabyPhotoPreview] = useState(null); // 미리보기 URL 상태 추가

  const isFormValid = babyName && babyGender && babyBirthDate && babyPhoto;

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setBabyPhoto(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setBabyPhotoPreview(e.target.result); // 파일 읽기가 완료되면 미리보기 URL을 설정
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderSelect = (gender) => {
    setBabyGender(gender);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      const formData = new FormData();
      formData.append("userId", id);
      formData.append("babyName", babyName);
      if (babyGender == "male") {
        formData.append("babyGender", BabyGender.Male);
      } else {
        formData.append("babyGender", BabyGender.Female);
      }
      formData.append("babyBirthDate", babyBirthDate);
      formData.append("profileImg", babyPhoto);
      //formData.append('role', "엄마");

      try {
        const data = await addBabyInfo(formData); // API 호출
        console.log("Baby information submitted successfully!");
        console.log(data);
        const list = data;
        setBabyList(list);
        //setBabyList(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="baby-add-container">
      <Link to="/main" className="arrow-back-link">
        <MdArrowBackIos className="arrow-back-icon" />
      </Link>
      <p className="baby-add-comment">추가할 아이 정보를 입력해주세요</p>
      <form className="baby-add-form" onSubmit={handleSubmit}>
        <div className="photo-gender">
          <div>
            {babyPhotoPreview && (
              <img
                src={babyPhotoPreview}
                alt="Preview"
                className="baby-photo-preview"
              />
            )}
            <input
              type="file"
              id="babyPhoto"
              onChange={handlePhotoChange}
              className="file-input"
            />
            <label htmlFor="babyPhoto" className="file-input-label">
              <FaCamera className="facamera" size={40} color="white" />
            </label>
          </div>
          <div>
            <div className="gender-selection">
              <button
                type="button"
                className={`gender-btn ${
                  babyGender === "male" ? "active" : ""
                }`}
                onClick={() => handleGenderSelect("male")}
              >
                남자
              </button>
              <button
                type="button"
                className={`gender-btn ${
                  babyGender === "female" ? "active" : ""
                }`}
                onClick={() => handleGenderSelect("female")}
              >
                여자
              </button>
            </div>
          </div>
        </div>
        <div className="text-date">
          <input
            type="text"
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            className="input-field"
            placeholder="이름"
          />
          <input
            type="date"
            value={babyBirthDate}
            onChange={(e) => setBabyBirthDate(e.target.value)}
            className="input-field"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="baby-add-submit"
          disabled={!isFormValid}
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default BabyAddPage;
