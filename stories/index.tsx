import bundleStories from "app/bus/stories/bundles";
import termsAndConditionsStories from "app/bus/stories/termsAndConditions";
import ticketStories from "app/bus/stories/tickets";

export default function loadStories() {
    bundleStories();
    ticketStories();
    termsAndConditionsStories();
}
