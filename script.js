document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        // 导航栏背景透明度变化
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
        
        // 高亮当前滚动位置对应的导航链接
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 产品图片切换
    const mainProductImage = document.querySelector('.product-image.main img');
    const thumbnails = document.querySelectorAll('.thumbnail img');
    
    if (mainProductImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newSrc = this.getAttribute('src');
                const oldSrc = mainProductImage.getAttribute('src');
                
                // 添加淡出效果
                mainProductImage.style.opacity = '0';
                
                setTimeout(() => {
                    mainProductImage.setAttribute('src', newSrc);
                    mainProductImage.style.opacity = '1';
                }, 300);
                
                // 高亮当前选中的缩略图
                thumbnails.forEach(thumb => {
                    thumb.parentElement.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            });
        });
    }
    
    // 添加滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .testimonial, .product-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // 初始化时执行一次
    animateOnScroll();
    
    // 滚动时执行
    window.addEventListener('scroll', animateOnScroll);
    
    // 表单验证
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单验证
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                isValid = false;
                showError(name, '请输入您的姓名');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                isValid = false;
                showError(email, '请输入您的邮箱');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, '请输入有效的邮箱地址');
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                isValid = false;
                showError(message, '请输入您的留言');
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // 模拟表单提交成功
                contactForm.reset();
                showSuccessMessage('感谢您的留言，我们会尽快回复您！');
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        formGroup.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showSuccessMessage(message) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = message;
        
        contactForm.insertAdjacentElement('afterend', successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--primary-color);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
        
        .feature-card, .step, .testimonial, .product-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.visible, .step.visible, .testimonial.visible, .product-image.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .thumbnail.active {
            border: 2px solid var(--primary-color);
        }
        
        .product-image.main img {
            transition: opacity 0.3s ease;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
        }
        
        .form-group.error input, .form-group.error textarea {
            border-color: #e74c3c;
        }
        
        .success-message {
            background-color: #2ecc71;
            color: white;
            padding: 15px;
            border-radius: var(--border-radius);
            margin-top: 20px;
            text-align: center;
            animation: fadeIn 0.5s ease;
        }
    `;
    
    document.head.appendChild(style);
    
    // 为第一个缩略图添加active类
    if (thumbnails.length > 0) {
        thumbnails[0].parentElement.classList.add('active');
    }
    
    // 创建图片文件夹和占位图片
    function createPlaceholderImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // 如果图片没有src或者src是不存在的路径，添加占位样式
            img.addEventListener('error', function() {
                this.classList.add('placeholder-image');
                this.style.width = '100%';
                this.style.height = img.getAttribute('height') || '300px';
                this.style.backgroundColor = '#f0f0f0';
                this.alt = '图片加载中';
            });
        });
    }
    
    createPlaceholderImages();
});