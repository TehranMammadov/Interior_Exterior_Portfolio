import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import "./ReadMore.scss";
import { useTranslation } from 'react-i18next'
import replaceBaseURL from "../../../utils/replaceurl";

const ReadMore = ({ blogDataHome }) => {
  const readMoreDesc = document.querySelectorAll('.read-more-desc');
  const singleWordsMore = [];
  const { t } = useTranslation();

  useEffect(() => {
      if (blogDataHome) {
        blogDataHome.map(dataBlog => {
          singleWordsMore.push(dataBlog?.description?.split(' '));
          return;
        })
        return;
      }
  }, [blogDataHome])

  useEffect(() => {
      if (blogDataHome) {
          for (let i = 0; i < singleWordsMore?.length; i++) {
              addedMoreText(singleWordsMore[i], i);
          }
          return;
      }
  }, [blogDataHome])

  function addedMoreText (singleWordCharacterMore, moreId) {
      for (let j = 0; j < singleWordCharacterMore?.length; j++) {
          if (document.querySelector(`#more-desc-${moreId}`)?.textContent?.split('').length < 300) {
              document.querySelector(`#more-desc-${moreId}`).textContent += ' ' + singleWordCharacterMore[j];
          }
      }
  }

  // useEffect(() => {
  //   readMoreDesc?.forEach(moreDesc => {
  //     if (moreDesc?.textContent?.split('').slice(-1) === ".") {
  //       moreDesc.textContent += "..";
  //     } else {
  //       moreDesc.textContent += "...";
  //     }
  //   })
  // }, [blogDataHome])

  return (
    <section className="read-more">
      {blogDataHome && blogDataHome.map((blogData, index) => (
        <div className="read-more__container" key={index}>
          <div className="read-more__container__image">
            <img src={replaceBaseURL(blogData && blogData?.image[0]?.url)} alt="" />
          </div>
          <div className="read-more__container__description">
            <p className="read-more-desc" id={`more-desc-${index}`}></p>
            <div className="read-more__container__description__title-and-btn-container">
              <div className="read-more-btn">
                <Link to={`/blog/${blogData && blogData?.id}`}>
                  <button>{t ('home.Point-btn')}</button>
                </Link>
              </div>
              <h2>{blogData && blogData?.title}</h2>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReadMore;
