import React from "react";
import Script from "react-load-script";
import graphql from "graphql";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import CookieConsent from "react-cookie-consent";
import Link from 'gatsby-link';

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const {data} = this.props;
    const page = data.markdownRemark;

    const points = page.frontmatter.tldr.map(({ point }) => (
      <div key={point.alt} className="column is-4">
        <div className="columns is-centered is-mobile">
          <div className="column is-one-third is-empty"></div>
          <div className="column is-one-third pallura-image">
            <figure className="image is-128x128">
              <img
                src={point.image}
                aria-hidden="true"
              />
            </figure>
          </div>
          <div className="column is-one-third is-empty"></div>
        </div>
        <div className="has-text-centered pallura-text">{point.alt}</div>
      </div>
      ));

    const pallurat = page.frontmatter.pallurat.map(({ pallura }) => (
      <div key={pallura.alt} className="column is-4">
        <div className="columns is-centered is-mobile">
          <div className="column is-one-third is-empty"></div>
          <div className="column is-one-third pallura-image">
            <figure className="image is-128x128">
              <img
                src={pallura.image}
                aria-hidden="true"
              />
            </figure>
          </div>
          <div className="column is-one-third is-empty"></div>
        </div>
        <div className="has-text-centered pallura-text">{pallura.alt}</div>
      </div>
    ));

    const naamat = page.frontmatter.people.map(({name, title, responsibility, email, phone, image, linkedin}) => (
      <div key={email} className="person-block column is-half">
        <div className="person-image-block">
          <div className="person-image">
            <figure className="image is-128x128">
              <img
                src={image.image}
                aria-label={image.alt}
              />
            </figure>
          </div>
        </div>
        <div className="person-info">
          <h4 className="title is-4">{name}</h4>
          <p>{title}</p>
          <p>{responsibility}</p>
          <p>{email}</p>
          <p>{phone}</p>
          <p><a href={linkedin} aria-label="link to linkedin"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a></p>
        </div>
      </div>
    ));

    const descriptions = page.frontmatter.description_rows.map((row) =>(
      <p key={row}>{row}</p>
    ));

    return (
      <div>
        <section className="section hero is-fullheight"
                 style={{backgroundImage: `url(${page.frontmatter.background})`, backgroundSize: "cover"}}>
          <Script
            url="https://identity.netlify.com/v1/netlify-identity-widget.js"
            onLoad={() => this.handleScriptLoad()}/>
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-one-third is-empty is-mobile"></div>
                <div className="column is-one-third is-mobile">
                  <div className="nb-logo image">
                    <img
                      style={{maxHeight: "150px", maxWidth: "600px"}}
                      src={page.frontmatter.logo}
                      aria-label="Northbound logo"
                    />
                  </div>
                </div>
                <div className="column is-one-third is-empty is-mobile"></div>
              </div>
            </div>
          </div>
          <div className="hero-foot">
            <div className="read-more container has-text-centered">
              <AnchorLink href="#read-more">
                <button className="button is-centered is-primary" href="#read-more">
                  Lue lisää
                </button>
              </AnchorLink>

            </div>
          </div>
        </section>
        <section id="read-more" className="container has-addons-centered tldr-container">
          <h3 className="title is-h3 has-text-centered">Tiesitkö, että...</h3>
          <div className="columns is-multiline pallurat-container">
            {points}
          </div>
        </section>
        <section className="container description-container">
          <h3 className="title is-h3 has-text-centered pad-top">Myynnin tehostamisen paras kumppani:</h3>
          <h3 className="title is-h3 has-text-centered">Northbound</h3>
          <div className="column is-10 is-offset-1 has-text-centered">{descriptions}</div>
        </section>
        <section className="container">
          <div className="pallurat-header">
            <h3 className="title is-h3 has-text-centered">{page.frontmatter.pallurat_title}</h3>
          </div>
          <div className="columns is-multiline pallurat-container">
           {pallurat}
         </div>
        </section>
        <footer className="footer people-container">
          <section className="container">
            <div className="columns is-multiline">
              {naamat}
            </div>
          </section>
        </footer>
        <section className="hero some-box">
          <div className="hero-body">
            <div className="container">
              <div className="is-vcentered">
                <div className="some-icon-container">
                  <a className="some-icon" href="https://www.facebook.com/northboundoy/" aria-label="link to facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                  <a className="some-icon" href="https://www.instagram.com/northbound.fi/" aria-label="link to instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CookieConsent
          location="bottom"
          buttonText="Ok"
          cookieName="nb-cookie-accept"
          style={{ background: "#124044", color: "#FFF" }}
          >
          Tämä verkkosivu käyttää evästeitä.{" "}
          <Link to="/cookie">
            Lue lisää
          </Link>
        </CookieConsent>
      </div>
    );
  }
}

export const pageQuery = graphql`
query IndexQuery {markdownRemark(frontmatter: {templateKey: {eq:"front-page"}}) {
  id
  frontmatter {
    title
    logo
    background
    description_rows
    tldr {
      point {
        image
        alt
      }
    }
    pallurat_title
    pallurat {
      pallura {
        image
        alt
      }
    }
    people {
      name
      title
      responsibility
      email
      phone
      linkedin
      image {
        image
        alt
      }
    }
  }
}}
`;
