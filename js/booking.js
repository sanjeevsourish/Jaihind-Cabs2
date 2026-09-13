document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.querySelector("#bookingForm");

    if (!bookingForm) {
        return;
    }

    const serviceMultiselect =
        document.querySelector("#serviceMultiselect");

    const serviceSelectButton =
        document.querySelector("#serviceSelectButton");

    const serviceSelectText =
        document.querySelector("#serviceSelectText");

    const serviceCheckboxes =
        document.querySelectorAll(
            '#serviceDropdown input[type="checkbox"]'
        );

    if (serviceSelectButton) {
        serviceSelectButton.addEventListener("click", function () {
            serviceMultiselect.classList.toggle("open");
        });
    }

   serviceCheckboxes.forEach(function (checkbox) {

    checkbox.addEventListener("change", function () {

        const selected = Array.from(serviceCheckboxes)
            .filter(function (item) {
                return item.checked;
            })
            .map(function (item) {
                return item.value;
            });

        if (selected.length > 3) {
            checkbox.checked = false;
            showServiceLimitNotification();
            return;
        }

        serviceSelectText.textContent =
            selected.length
                ? selected.join(", ")
                : "Select a service";

                function showServiceLimitNotification() {

    const existingNotification =
        document.querySelector("#serviceLimitNotification");

    if (existingNotification) {
        existingNotification.remove();
    }

    const notification =
        document.createElement("div");

    notification.id =
        "serviceLimitNotification";

    notification.innerHTML = `
        <div class="service-limit-icon">
            <span>!</span>
        </div>

        <div class="service-limit-content">
            <strong>Maximum 3 Services</strong>
            <span>You can select up to 3 services for one booking.</span>
        </div>

        <button
            type="button"
            class="service-limit-close"
            aria-label="Close notification"
        >
            ×
        </button>
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(function () {
        notification.classList.add("show");
    });

    const closeButton =
        notification.querySelector(".service-limit-close");

    closeButton.addEventListener("click", function () {

        notification.classList.remove("show");

        setTimeout(function () {
            notification.remove();
        }, 350);

    });

    setTimeout(function () {

        if (notification.parentElement) {

            notification.classList.remove("show");

            setTimeout(function () {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 350);

        }

    }, 4500);
}

    });

});

    document.addEventListener("click", function (event) {

        if (
            serviceMultiselect &&
            !serviceMultiselect.contains(event.target)
        ) {
            serviceMultiselect.classList.remove("open");
        }

    });

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.querySelector("#customerName")?.value.trim();

        const phone =
            document.querySelector("#customerPhone")?.value.trim();

        const selectedServices = Array.from(
            document.querySelectorAll(
                '#serviceDropdown input[type="checkbox"]:checked'
            )
        ).map(function (checkbox) {
            return checkbox.value;
        });

        if (selectedServices.length === 0) {
            alert("Please select at least one service.");
            return;
        }

        const service = selectedServices.join(", ");

        const pickup =
            document.querySelector("#pickupLocation")?.value.trim();

        const destination =
            document.querySelector("#destination")?.value.trim();

        const travelDate =
            document.querySelector("#travelDate")?.value;

        const passengers =
            document.querySelector("#passengers")?.value;

        const tripType =
            document.querySelector("#tripType")?.value;

        if (
            !name ||
            !phone ||
            !service ||
            !passengers ||
            !pickup ||
            !destination ||
            !travelDate ||
            !tripType
        ) {
            alert("Please fill in all required booking details.");
            return;
        }

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        const formattedDate =
            new Date(travelDate).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );

        const whatsappMessage =
    `🚕 *JAIHIND CABS*
    *BOOKING REQUEST*
    ━━━━━━━━━━━━━━━━

    👤 *Customer Name:* ${name}
    📞 *Phone:* ${phone}
    🚘 *Service:* ${service}

    📍 *Pickup:* ${pickup}
    🏁 *Destination:* ${destination}
    📅 *Travel Date:* ${formattedDate}

    👥 *Passengers:* ${passengers}
    🔄 *Trip Type:* ${tripType}

    ━━━━━━━━━━━━━━━━
    _Please contact me regarding this booking._`;

        const whatsappNumber = "919940162462";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);

        window.location.href = whatsappURL;

    });

    const dateInput =
        document.querySelector("#travelDate");

    if (dateInput) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const day =
            String(today.getDate()).padStart(2, "0");

        dateInput.min =
            `${year}-${month}-${day}`;
    }

    const phoneInput =
        document.querySelector("#customerPhone");

    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 10);

        });

    }

    bookingForm.addEventListener("input", function () {

        const confirmation =
            document.querySelector("#bookingConfirmation");

        if (confirmation) {
            confirmation.style.display = "none";
        }

    });

});

window.addEventListener("pageshow", function () {

    const form =
        document.getElementById("bookingForm");

    if (form) {
        form.reset();
    }

});