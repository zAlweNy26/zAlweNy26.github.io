<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col gap-4 items-center justify-evenly text-center">
        <b class="!text-4xl">Privacy Policy</b>
        <p>
            <b>Sensorify</b> was created by <b>zAlweNy26</b> of which it is the owner.
            This Service is provided free of charge by <b>zAlweNy26</b>.
        </p>
        <b>Links to other external sites</b>
        <p>
            This Service may contain links to other external sites. If the User clicks on a third party, he will be directed
            to that site.
            Note that these external sites are not managed by the Owner. Therefore, the User is urged to check the privacy
            policy of these websites.
            The Owner assumes no responsibility for the content, privacy policies or practices of third-party sites or
            services.
        </p>
        <b>Information Collection and Use</b>
        <p>
            For a better experience, while using our Service, I may require you to provide us with certain personally
            identifiable information. The information that I request will be retained on your device and is not collected by
            me in any way.
            The app does use third party services that may collect information used to identify you.<br>
            Link to privacy policy of third party service providers used by the app :
        </p>
        <ul class="list-disc list-inside">
            <li>Google Play Services (<a href="https://policies.google.com/privacy" target="_blank">here</a>)</li>
            <li>Google Fonts (<a href="https://developers.google.com/terms" target="_blank">here</a>)</li>
            <li>Firebase Analytics (<a href="https://firebase.google.com/policies/analytics" target="_blank">here</a>)</li>
            <li>Material Design Icons (<a href="https://dev.materialdesignicons.com/license" target="_blank">here</a>)</li>
            <li>MPAndroidChart by PhilJay (<a href="https://github.com/PhilJay/MPAndroidChart/blob/master/LICENSE" target="_blank">here</a>)</li>
            <li>ExpandableLayout by cachapa (<a href="https://github.com/cachapa/ExpandableLayout/blob/master/LICENSE.txt" target="_blank">here</a>)</li>
            <li>VectorChildFinder by devsideal (<a href="https://github.com/devendroid/VectorChildFinder/blob/master/LICENSE" target="_blank">here</a>)</li>
            <li>Lingver by YarikSOffice (<a href="https://github.com/YarikSOffice/lingver/blob/master/LICENSE.md" target="_blank">here</a>)</li>
        </ul>
        <b>Specific information</b>
        <p>
            At the request of the User, in addition to the information contained in this privacy policy,
            this Application may provide the User with additional and contextual information regarding specific Services, or
            the collection and processing of Personal Data.
        </p>
        <b>Changes to this privacy policy</b>
        <p>
            The Data Controller reserves the right to make changes to this privacy policy at any time by notifying it to
            Users on this page and,
            if possible, on this Application as well as, if technically and legally feasible, by sending a notification to
            Users through one of the extremes of contact he has.
            Please therefore consult this page frequently, referring to the date of the last modification indicated at the
            bottom.
            If the changes concern treatments whose legal basis is consent, the Data Controller will collect the User's
            consent again, if necessary.
        </p>
        <b>Information not contained in this policy</b>
        <p>
            Further information in relation to the processing of Personal Data may be requested at any time to the Data
            Controller using the contact details.
        </p>
        <b>Contact</b>
        <p>
            For any questions or suggestions about this Privacy Policy, do not hesitate to contact the owner at the email
            address : <b>alwe.dev@gmail.com</b>
        </p>
    </div>
</template>

<style scoped>
b {
    text-align: center;
    background: linear-gradient(to right, #01ffcd 0%, #00ff00 50%);
    background-clip: text;
    -webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

div a {
    @apply link font-semibold no-underline;
}

div > b {
    @apply text-lg md:text-xl
}
</style>