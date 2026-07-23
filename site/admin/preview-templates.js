// Aperçus en direct pour l'admin — s'affichent à côté du formulaire pendant l'édition
var previewStyles = {
  wrap: { fontFamily: "'Inter', sans-serif", background: "#EFDFC2", padding: "24px", minHeight: "100%" },
  card: { background: "rgba(255,255,255,0.6)", borderRadius: "14px", padding: "16px 18px", marginBottom: "14px" },
  title: { fontFamily: "'Playfair Display', serif", color: "#2E2440", margin: "0 0 4px", fontSize: "16px" },
  meta: { fontSize: "12px", color: "#6b5f80", margin: "0 0 8px" },
  text: { fontSize: "13px", color: "#3B3050", margin: 0 },
  img: { width: "100%", maxHeight: "160px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }
};

var VlogPreview = createClass({
  render: function() {
    var posts = this.props.entry.getIn(['data', 'posts']) || [];
    return h('div', { style: previewStyles.wrap },
      posts.map(function(post, i) {
        var images = post.get('images');
        var firstImg = images && images.size ? images.get(0).get('src') : null;
        return h('div', { key: i, style: previewStyles.card },
          firstImg ? h('img', { src: firstImg, style: previewStyles.img }) : null,
          h('h3', { style: previewStyles.title }, post.get('title')),
          h('p', { style: previewStyles.meta }, post.get('date')),
          h('p', { style: previewStyles.text }, post.get('excerpt'))
        );
      }).toArray()
    );
  }
});

var HistoriquePreview = createClass({
  render: function() {
    var events = this.props.entry.getIn(['data', 'events']) || [];
    return h('div', { style: previewStyles.wrap },
      events.map(function(ev, i) {
        return h('div', { key: i, style: previewStyles.card },
          h('p', { style: { fontSize: "11px", color: "#8C6B3A", fontWeight: "600", margin: "0 0 4px" } }, ev.get('year')),
          h('h3', { style: previewStyles.title }, ev.get('title')),
          h('p', { style: previewStyles.text }, ev.get('text'))
        );
      }).toArray()
    );
  }
});

var VisitesPreview = createClass({
  render: function() {
    var visites = this.props.entry.getIn(['data', 'visites']) || [];
    return h('div', { style: previewStyles.wrap },
      visites.map(function(v, i) {
        return h('div', { key: i, style: previewStyles.card },
          h('h3', { style: previewStyles.title }, v.get('title')),
          h('p', { style: previewStyles.meta }, v.get('date') + ' · ' + v.get('places_restantes') + ' places'),
          h('p', { style: previewStyles.text }, v.get('adresse'))
        );
      }).toArray()
    );
  }
});

var ReglagesPreview = createClass({
  render: function() {
    var data = this.props.entry.get('data');
    var logo = data.get('logo');
    var pct = data.get('cagnotte_objectif') ? Math.min(100, Math.round((data.get('cagnotte_montant_actuel') / data.get('cagnotte_objectif')) * 100)) : 0;
    return h('div', { style: previewStyles.wrap },
      logo ? h('img', { src: logo, style: { height: "50px", marginBottom: "14px" } }) : null,
      h('div', { style: previewStyles.card },
        h('p', { style: previewStyles.title }, 'Cagnotte'),
        h('div', { style: { height: "8px", background: "#e0d3ba", borderRadius: "4px", overflow: "hidden", marginBottom: "6px" } },
          h('div', { style: { width: pct + '%', height: "100%", background: "#D4A63D" } })
        ),
        h('p', { style: previewStyles.meta }, (data.get('cagnotte_montant_actuel') || 0) + ' € sur ' + (data.get('cagnotte_objectif') || 0) + ' €')
      ),
      h('p', { style: previewStyles.text }, 'Facebook : ' + (data.get('facebook') || '—')),
      h('p', { style: previewStyles.text }, 'Instagram : ' + (data.get('instagram') || '—')),
      h('p', { style: previewStyles.text }, 'WhatsApp : ' + (data.get('whatsapp') || '—'))
    );
  }
});

CMS.registerPreviewTemplate('vlog', VlogPreview);
CMS.registerPreviewTemplate('historique', HistoriquePreview);
CMS.registerPreviewTemplate('visites', VisitesPreview);
CMS.registerPreviewTemplate('reglages', ReglagesPreview);
