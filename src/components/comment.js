import React, {Component} from "react";

export default class Comments extends Component {

  constructor(props){
    super(props);
    this.commentBox = React.createRef(); // Creates a reference to inject the <script> element
  }
  componentDidMount () {
      let scriptEl = document.createElement("script");
      scriptEl.setAttribute("src", "https://giscus.app/client.js");
      scriptEl.setAttribute("crossorigin", "anonymous");
      scriptEl.setAttribute("async", true);
      scriptEl.setAttribute("data-repo", "heriswn/gatsby-improved-starter-blog");
      scriptEl.setAttribute("data-mapping", "pathname");
      scriptEl.setAttribute("data-reactions-enabled", "1");
      scriptEl.setAttribute("data-emit-metadata", "1");
      scriptEl.setAttribute("data-lang", "en");
      scriptEl.setAttribute( "data-theme", "dark");
      this.commentBox.current.appendChild(scriptEl);
  }

  render() {
    return (
        <div className="comment-box-wrapper container pt-7">
          <h2 className="blog-post">Comments</h2>
          <hr className="my-0"/>
          <div ref={this.commentBox} className="comment-box"/>
          {/* Above element is where the comments are injected */}
        </div>
    );
  }
}