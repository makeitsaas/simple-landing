# Simple Landing

WIP

Rules :
- Editor shall only allow HtmlColumn children to HtmlColumns
- Editor shall present multiple edition steps (page settings, wireframe, main css, blocks (fields, I18n, custom styles) and then JS)
- Pages rendering shall be available in a subpath url (/sites/:site_id/pages/:page_id), then made as a standalone website using simple-proxy service

Code :
- entities in `src/{module}/entities` directories, as `entity-name.ts` (`@Entity` decorator required)
- controllers in `src/{module}/controllers` directories, as `controller-name.controller.ts`


Tests :
- tester que le render marche bien (avec/sans options, chaque type et custom)
- tester que le setRenderMode est bien propagé à tous les enfants instanciés
- tester que la langue est bien la bonne (soit lang, soit default lang)
- tester que les translations sont les bonnes (lang+default lang)
- tester le build d'une page complète (nombre de sections, etc)
- tests de sécurité (accès au wf en mode connecté seulement, alors que public pour le render full - pour le moment)
