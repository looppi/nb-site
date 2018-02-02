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
//    console.log(data);
    const page = data.markdownRemark;
//    console.log(page);

    const points = page.frontmatter.tldr.map(({ point }) => (
      <div key={point} className="">
        <div className="has-text-justified">
          {point}
        </div>
      </div>));
    console.log(points);

    console.log(page.frontmatter.foofaa);
    const pallurat = page.frontmatter.foofaa.map(({ img, alt }) => (
      <div key={alt} className="column is-4">
        <div>{alt}</div>
        <figure className="image is-128x128">
          <img
            src={img}
            aria-label={alt}
          />
        </figure>
      </div>
    ));
    console.log(page.frontmatter);
    console.log(page.frontmatter.people);
    const naamat = page.frontmatter.people.map(({name, title, responsibility, email, phone, image}) => (
      <div key={email} className="column is-half person-block">
        <div className="columns is-centered">
          <div className="column is-half">
            <figure className="image is-128x128 person-picture">
              <img
                src={image.image}
                aria-label={image.alt}
              />
            </figure>
            <div className="person">
              <h4 className="title is-4">{name}</h4>
              <p>{title}</p>
              <p>{responsibility}</p>
              <p>{email}</p>
              <p>{phone}</p>
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
              <div className="nb-logo image">
                <img
                  style={{maxHeight: "150px"}}
                  src={page.frontmatter.logo}
                  aria-label="Northbound logo"
                />
              </div>
            </div>
          </div>
          <div className="hero-foot">
            <div className="read-more container has-text-centered">
              <Link to="#snap-to">
                <button className="button is-centered is-primary">
                  READ MORE
                </button>
              </Link>

            </div>
          </div>
        </section>
        <section id="snap-to" className="container has-addons-centered">
          <div className="column is-8 is-offset-2">
            {points}
          </div>
        </section>
        <section className="container">
          <div className="column is-8 is-offset-2 has-text-justified">{page.frontmatter.description}</div>
        </section>
        <section className="container">
         <div className="columns is-multiline">
           {pallurat}
         </div>
        </section>
        <section className="container">
          <div className="columns is-multiline">
            {naamat}
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
      point
    }
    foofaa_title
    foofaa {
      img
      alt
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
