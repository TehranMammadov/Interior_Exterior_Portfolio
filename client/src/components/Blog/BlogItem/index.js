import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import replaceBaseURL from "../../../utils/replaceurl";

const BlogItem = ({ blogData }) => {
    const { t } = useTranslation();
    const cardDesc = document.querySelectorAll('.card_description');
    const singleWords = [];

    useEffect(() => {
        if (blogData) {
            blogData.map(dataBlog => {
                singleWords.push(dataBlog?.description?.split(' '));
                return;
            })
            return;
        }
    }, [blogData])

    useEffect(() => {
        if (blogData) {
            for (let i = 0; i < singleWords?.length; i++) {
                addedMainText(singleWords[i], i);
            }
            return;
        }
    }, [blogData])

    function addedMainText (singleWordCharacter, descId) {
        for (let j = 0; j < singleWordCharacter?.length; j++) {
            if (document.querySelector(`#card-desc-${descId}`)?.textContent?.split('').length < 300) {
                document.querySelector(`#card-desc-${descId}`).textContent += ' ' + singleWordCharacter[j];
            }
        }
    }

    // useEffect(() => {
    //     cardDesc?.forEach(desc => {
    //         if (desc?.textContent?.split('').slice(-1) === ".") {
    //             desc.textContent += "..";
    //         } else {
    //             desc.textContent += "...";
    //         }
    //     })
    // }, [blogData])
    

    return (
        <div>
            {blogData && blogData.map((item, index) => (
                <div key={index} className="card">
                    <div className="card__image">
                        <img src={replaceBaseURL(item.image && item?.image[0]?.url)} alt="blogimage" />
                    </div>
                    <div className="card__detail">
                        <p className="card_description" id={`card-desc-${index}`}></p>
                        <div className="read-more-and-title">
                            <Link
                                to={`/blog/${item?.id}`}
                                className="read-more-link"
                            >
                              {t ('bloq.notification')}
                            </Link>
                            <p className="card-title">{item && item.title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogItem;