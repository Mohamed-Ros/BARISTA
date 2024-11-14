
// content upload monitoring
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item"); // الحصول على عناصر القائمة

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // إضافة فئة "show" عند ظهور العنصر
            }
        });
    });

    menuItems.forEach(item => observer.observe(item)); // مراقبة كل عنصر في القائمة
});

// مراقبة حدث التمرير
window.addEventListener('scroll', function() {
    console.log('Scrolling...'); // تتبع حركة التمرير
});

// إضافة التعليقات والتقييمات
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star'); // الحصول على نجوم التقييم
    let selectedRating = 0; // متغير لتخزين التقييم المختار

    // إضافة مستمعات الحدث للنجوم لتحديد التقييم
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.dataset.value; // الحصول على قيمة التقييم من عنصر النجمة
            updateStars(selectedRating); // تحديث حالة النجوم
        });
    });

    // تحديث حالة النجوم
    const updateStars = (rating) => {
        stars.forEach(star => {
            if (star.dataset.value <= rating) {
                star.classList.add('selected'); // إضافة فئة "selected" للنجوم المختارة
            } else {
                star.classList.remove('selected'); // إزالة الفئة من النجوم غير المختارة
            }
        });
    };

    const submitButton = document.querySelector('.submit-btn'); // الحصول على زر الإرسال

    // إضافة مستمع للزر لإرسال التعليق والتقييم
    submitButton.addEventListener('click', () => {
        console.log('تم النقر على زر الإرسال'); // تتبع زر الإرسال
        const comment = document.querySelector('.comment').value; // الحصول على التعليق
        const fromName = "اسمك"; // اسم المرسل (يمكن تعديله)
        const toName = "اسم المستلم"; // اسم المستلم (يمكن تعديله)
        const replyTo = 'testvoid43@gmail.com'; // البريد الإلكتروني الخاص بك

        // التحقق من أن التقييم والتعليق قد تم إدخالهما
        if (selectedRating > 0 && comment) {
            // إرسال البيانات إلى EmailJS
            emailjs.send('service_test_iD', 'template_ckvn45x', {
                rating: selectedRating,
                comment: comment,
                from_name: fromName,
                to_name: toName,
                reply_to: replyTo,
                message: comment // تضمين التعليق كرسالة
            }, 'eomGvCvnPlJ4ptvoh')
            .then((response) => {
                alert('تم إرسال التقييم والتعليق بنجاح!'); // تنبيه بنجاح الإرسال
                document.querySelector('.comment').value = ''; // مسح التعليق
                updateStars(0); // إعادة تعيين النجوم
            }, (error) => {
                alert('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا.'); // تنبيه عند حدوث خطأ
                console.error('Error:', error);
            });
        } else {
            alert('يرجى اختيار تقييم وإضافة تعليق.'); // تنبيه عند عدم إدخال التقييم أو التعليق
        }
    });
});

// إضافة تأثيرات على قسم المراجعات
document.addEventListener('DOMContentLoaded', () => {
    const reviews = document.querySelectorAll('.review'); // الحصول على مراجعات المستخدمين

    reviews.forEach(review => {
        review.addEventListener('mouseenter', () => {
            review.classList.add('hovered'); // إضافة فئة عند المرور بالماوس
        });

        review.addEventListener('mouseleave', () => {
            review.classList.remove('hovered'); // إزالة الفئة عند الخروج بالماوس
        });
    });
});

// إضافة تأثيرات قسم التوصيل
window.addEventListener('load', function () {
    const section = document.querySelector('.delivery-section'); // الحصول على قسم التوصيل
    section.style.opacity = '0'; // بدءًا من عدم الظهور
    section.style.transition = 'opacity 1.5s ease-in-out'; // إضافة تأثير الانتقال
    
    setTimeout(function () {
        section.style.opacity = '1'; // جعل القسم مرئيًا بعد 300 مللي ثانية
    }, 300);
});





// ==========
function redirectToOrderPage(itemName, price) {
    // تحويل إلى صفحة الطلب مع تمرير اسم المنتج والسعر كجزء من الرابط
    window.location.href = `order.html?item=${encodeURIComponent(itemName)}&price=${price}`;
}


// دالة لاستخراج قيم الـ Parameters من الرابط
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// عرض اسم المنتج والسعر في الصفحة
document.addEventListener("DOMContentLoaded", function() {
    const itemName = getQueryParam('item');
    const price = getQueryParam('price');
    
    if (itemName && price) {
        document.getElementById('selected-item').innerText = `طلب: ${itemName} - ${price} EGP`;
    }
});


function openOrderSection(itemName, price, orderType) {
    orderDetails = { itemName, price, orderType };

    // إخفاء الخيارات
    document.getElementById("order-options").style.display = 'none';

    // عرض نموذج الطلب بناءً على نوع الطلب
    document.getElementById("order-section").style.display = 'block';
    document.getElementById("selected-item").innerText = `طلب: ${itemName} - ${price} EGP`;

    if (orderType === 'remote') {
        document.getElementById("delivery-fields").style.display = 'block';
        document.getElementById("table-fields").style.display = 'none';
    } else {
        document.getElementById("delivery-fields").style.display = 'none';
        document.getElementById("table-fields").style.display = 'block';
        // ضبط العنوان بناءً على الطاولة
        if (orderType === 'table-indoor') {
            document.getElementById("table-number").placeholder = "رقم الطاولة الداخلية";
        } else if (orderType === 'table-roof') {
            document.getElementById("table-number").placeholder = "رقم طاولة الروف";
        }
    }
}
