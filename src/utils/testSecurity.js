// Security validation utility
// Run this in browser console or as a test to verify security setup

export const validateSecurity = () => {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  // Check 1: Environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const apiBase = import.meta.env.VITE_API_BASE;

  if (supabaseUrl && supabaseUrl.includes('supabase.co')) {
    results.passed.push('✅ VITE_SUPABASE_URL is set');
  } else {
    results.failed.push('❌ VITE_SUPABASE_URL missing or invalid');
  }

  if (supabaseKey && supabaseKey.startsWith('eyJ')) {
    results.passed.push('✅ VITE_SUPABASE_ANON_KEY is set (anon key format)');
  } else {
    results.failed.push('❌ VITE_SUPABASE_ANON_KEY missing or invalid format');
  }

  if (apiBase) {
    results.passed.push('✅ REACT_APP_API_BASE is set');
  } else {
    results.failed.push('❌ REACT_APP_API_BASE missing');
  }

  // Check 2: No service keys exposed
  const envVars = Object.keys(process.env).filter(key => key.includes('SUPABASE'));
  const hasServiceKey = envVars.some(key => 
    process.env[key] && 
    typeof process.env[key] === 'string' && 
    process.env[key].length > 100 && 
    !process.env[key].startsWith('eyJ')
  );

  if (!hasServiceKey) {
    results.passed.push('✅ No service keys detected in client environment');
  } else {
    results.failed.push('🚨 Potential service key detected - SECURITY RISK!');
  }

  // Check 3: HTTPS in production
  if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
    results.passed.push('✅ HTTPS or localhost detected');
  } else {
    results.warnings.push('⚠️ Not using HTTPS in production');
  }

  // Check 4: API endpoint security
  if (apiBase && apiBase.startsWith('https://')) {
    results.passed.push('✅ API backend uses HTTPS');
  } else if (apiBase && apiBase.includes('localhost')) {
    results.warnings.push('⚠️ API backend is localhost (development)');
  } else {
    results.failed.push('❌ API backend not using HTTPS');
  }

  // Output results
  console.group('🔒 Security Validation Results');
  
  if (results.passed.length > 0) {
    console.group('✅ Passed');
    // Debug logs removed - console cleanup
    console.groupEnd();
  }

  if (results.warnings.length > 0) {
    console.group('⚠️ Warnings');
    results.warnings.forEach(msg => console.warn(msg));
    console.groupEnd();
  }

  if (results.failed.length > 0) {
    console.group('❌ Failed');
    results.failed.forEach(msg => console.error(msg));
    console.groupEnd();
  }

  console.groupEnd();

  return {
    isSecure: results.failed.length === 0,
    results
  };
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  validateSecurity();
} 