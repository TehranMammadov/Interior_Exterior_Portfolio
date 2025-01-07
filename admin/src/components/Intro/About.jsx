import React, {Fragment} from 'react'
import '../../assets/css/Intro/IntroAbout.css'
import Breadcrumb from '../Breadcrumb'
import Media from '../Media'

function About() {
  return (
    <Fragment>
      <Breadcrumb pageName={"About"}/>

      <div className='about-container'>
        <form>
          <div className='about'>
              <label>
                Title <br/>
                <input type="text" placeholder='Aliquet tristique' />
              </label> <br/>

              <label>
                Short description <br/>
                <input type="text" placeholder='Aliquet tristique' />
              </label>

              <div className="about-media-container">
                <h3>Media</h3>

                <ol>
                  <li>Aliquet tristique</li>
                  <li>Aliquet tristique</li>
                  <li>Aliquet tristique</li>
                  <li>Aliquet tristique</li>
                </ol>

                <button className="form-button">
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="13.25" x2="13" y2="13.25" stroke="#595959" strokeWidth="1.5"/>
                    <path d="M12 5.5L11.0306 4.53063L7.1875 8.36687V0H5.8125V8.36687L1.97625 4.52375L1 5.5L6.5 11L12 5.5Z" fill="#595959"/>
                  </svg>

                    Download Images
                </button>
              </div>
          </div>
          
          <div className="form-buttons">
            <button>
              Cancel
            </button>
            <button>
              Save
            </button>
          </div>
        </form>

        <Media/>
        
      </div>

    </Fragment>
  )
}

export default About