using System.Web.Optimization;

namespace MovieApp.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                // AngularJs Core modules/services/directives.
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-animate.js"
                        )
                        .Include(
                // AngularJs jQuery plugins/Custom providers
                        "~/Scripts/angular-ui-router.js",
                        "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                        "~/Scripts/angucomplete-alt.js",
                        "~/Scripts/angular-local-storage.js",
                        "~/Scripts/angular-youtube-embed.js",
                        "~/Scripts/toaster.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").IncludeDirectory("~/app/", "*.js"));
            bundles.Add(new ScriptBundle("~/bundles/service").IncludeDirectory("~/app/services", "*.js"));
            bundles.Add(new ScriptBundle("~/bundles/filter").IncludeDirectory("~/app/filters", "*.js"));
            bundles.Add(new ScriptBundle("~/bundles/directive").IncludeDirectory("~/app/directives", "*.js"));
            bundles.Add(new ScriptBundle("~/bundles/controller").IncludeDirectory("~/app/controllers", "*.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/angucomplete-alt.css",
                      "~/Content/toaster.css",
                      "~/Content/site.css"));
        }
    }
}