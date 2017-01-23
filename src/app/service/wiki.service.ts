import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

@Injectable()
export class WikipediaService {
  constructor(private jsonp: Jsonp) {}
  search (term: string) {
    let wikiUrl = 'http://en.wikipedia.org/w/api.php';
    let paytm_url ='https://search.paytm.com/suggest?channel=web&child_site_id=1&site_id=1&version=2&s=apple&sso_token_enc=e7e9e6680542e82bf37cf87787ac107210ee58981f6434f8ec91273a2bc6972ddb4e26440a0cae93852596b519dc40c3&cat_tree=1';
    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this.jsonp
               .get(wikiUrl, { search: params })
               .map(response => <string[]> response.json()[1]);
  }
}
