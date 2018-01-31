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
    const { data } = this.props;
    const page = data.markdownRemark;
//    console.log(data);
//    console.log(page);
    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <div className="container">
            <div className="content">
                <section className="hero is-large">
                    <div className="hero-body" style={{ backgroundImage: `url(${page.frontmatter.background})`, backgroundSize: "cover"}}>
                        <div className="container"></div>
                        <div className="nb-logo image is-2by1">
                            <img
                                style={{ borderRadius: '5px' }}
                                src={page.frontmatter.logo}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
query IndexQuery {markdownRemark(frontmatter: {templateKey: {eq:"front-page"}}) {
  id
  frontmatter {
    title
    background
    logo
    description
  }
}}
`;
