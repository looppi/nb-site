import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";

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

    console.log(page.frontmatter.people);
    const naamat = page.frontmatter.people.map(({name, title, responsibility, email, phone, image}) => (
      <div key={email} className="column is-half person-block">
        <div className="columns is-centered is-mobile">
          <div className="column">
            <div className="columns is-centered is-mobile">
              <div className="column is-one-third is-empty"></div>
              <div className="column is-one-third person-image">
                <figure className="image is-128x128">
                  <img
                    src={image.image}
                    aria-label={image.alt}
                  />
                </figure>
              </div>
              <div className="column is-one-third is-empty"></div>
            </div>
            <div className="columns is-centered is-mobile">
              <div className="column is-one-third is-empty"></div>
              <div className="person-info column is-one-third">
                <h4 className="title is-4">{name}</h4>
                <p>{title}</p>
                <p>{responsibility}</p>
                <p>{email}</p>
                <p>{phone}</p>
              </div>
              <div className="column is-one-third is-empty"></div>
            </div>
          </div>
        </div>
      </div>
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
              <Link to="#snap-to">
                <button className="button is-centered is-primary">
                  Lue lisää
                </button>
              </Link>

            </div>
          </div>
        </section>
        <section id="snap-to" className="container has-addons-centered tldr-container">
          <h3 className="title is-h3 has-text-centered">Tiesitkö, että...</h3>
          <div className="columns is-multiline pallurat-container">
            {points}
          </div>
        </section>
        <section className="container description-container">
          <h3 className="title is-h3 has-text-centered pad-top">Myynnin tehostamisen paras kumppani:</h3>
          <h3 className="title is-h3 has-text-centered">Northbound</h3>
          <div className="column is-10 is-offset-1 has-text-justified">{page.frontmatter.description}</div>
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
          <div className="columns is-multiline">
            {naamat}
          </div>
        </footer>
        <section className="hero some-box">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-half is-centered some-icon-container">
                  <a className="some-icon" href="https://www.facebook.com/northboundoy/" aria-label="link to facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                </div>
                <div className="column is-half is-centered some-icon-container">
                  <a className="some-icon" href="https://www.instagram.com/northbound.fi/" aria-label="link to instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    description
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
      image {
        image
        alt
      }
    }
  }
}}
`;
