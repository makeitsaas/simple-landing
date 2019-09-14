import { HtmlElement } from '../../../framework/core/abstracts/html-element';

const BOOTSTRAP_CSS_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css';
const BOOTSTRAP_CSS_THEME_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css';
const BOOTSTRAP_JS_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js';
const JQUERY_JS_URL = 'https://code.jquery.com/jquery-1.12.4.min.js';

export class HtmlPage extends HtmlElement {
    template =
        `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Simple Landing</title>
    <meta name="description" content="The HTML5 Herald">
    <meta name="author" content="SitePoint">
    
    <link rel="stylesheet" href="${BOOTSTRAP_CSS_URL}" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    <link rel="stylesheet" href="${BOOTSTRAP_CSS_THEME_URL}" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <div class="page">%children%</div>
    
    <script src="${JQUERY_JS_URL}" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
    <script src="${BOOTSTRAP_JS_URL}" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
</body>
</html>
`
}
