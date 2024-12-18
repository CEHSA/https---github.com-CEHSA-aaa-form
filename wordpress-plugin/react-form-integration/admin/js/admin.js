jQuery(document).ready(function($) {
    // CORS headers for AJAX requests
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', reactFormAdmin.nonce);
        }
    });

    // Table sorting functionality
    $('.wp-list-table th').on('click', function() {
        var table = $(this).parents('table').eq(0);
        var index = $(this).index();
        var isNumeric = $(this).hasClass('numeric');
        var rows = table.find('tr:gt(0)').toArray();
        
        rows.sort(function(a, b) {
            var aValue = $(a).find('td').eq(index).text();
            var bValue = $(b).find('td').eq(index).text();
            
            if (isNumeric) {
                return parseFloat(aValue) - parseFloat(bValue);
            }
            return aValue.localeCompare(bValue);
        });

        if ($(this).hasClass('sorted-asc')) {
            rows.reverse();
            $(this).removeClass('sorted-asc').addClass('sorted-desc');
        } else {
            $(this).removeClass('sorted-desc').addClass('sorted-asc');
        }

        table.find('tr:gt(0)').remove();
        table.append(rows);
    });

    // Handle tab navigation
    $('.nav-tab').on('click', function(e) {
        e.preventDefault();
        var tabHref = $(this).attr('href');
        var tab = tabHref.split('tab=')[1];
        
        // Update URL without reload
        if (window.history && window.history.pushState) {
            window.history.pushState(null, '', tabHref);
        }
        
        // Update active tab
        $('.nav-tab').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active');
        
        // Show/hide content
        $('.tab-content > div').hide();
        $('.' + tab + '-tab').show();
    });

    // Check API status
    function checkApiStatus() {
        $.ajax({
            url: reactFormAdmin.apiUrl + 'settings',
            method: 'GET',
            success: function(response) {
                $('.api-status')
                    .removeClass('status-error')
                    .addClass('status-ok')
                    .find('.status-text')
                    .text('API Connected')
                    .end()
                    .find('.error')
                    .hide();
            },
            error: function(xhr, status, error) {
                $('.api-status')
                    .removeClass('status-ok')
                    .addClass('status-error')
                    .find('.status-text')
                    .text('API Connection Failed')
                    .end()
                    .find('.error')
                    .show()
                    .text(error || 'Connection error');
            }
        });
    }

    // Check API status on page load and every 30 seconds
    if ($('.api-status').length) {
        checkApiStatus();
        window.setInterval(checkApiStatus, 30000);
    }

    // Helper function to add notices
    function addNotice(message, type) {
        var $notice = $('<div>')
            .addClass('notice notice-' + type + ' is-dismissible')
            .append($('<p>').text(message));
        
        $('.wrap h1').after($notice);
        
        if (type === 'success') {
            window.setTimeout(function() {
                $notice.fadeOut(function() {
                    $(this).remove();
                });
            }, 3000);
        }
    }

    // Handle settings form submission
    $('#react-form-settings-form').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            ozow: {
                site_code: $('input[name="ozow_site_code"]').val(),
                api_key: $('input[name="ozow_api_key"]').val(),
                private_key: $('input[name="ozow_private_key"]').val(),
                is_test: $('input[name="ozow_test_mode"]').is(':checked')
            }
        };

        $.ajax({
            url: reactFormAdmin.apiUrl + 'settings',
            method: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                addNotice('Settings saved successfully.', 'success');
            },
            error: function(xhr, status, error) {
                addNotice('Error saving settings: ' + (error || 'Unknown error'), 'error');
            }
        });
    });
});