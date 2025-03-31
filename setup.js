const { execSync, spawn } = require('child_process');
const path = require('path');

function runSyncCommand(command, directory = '.') {
    try {
        const fullPath = path.join(__dirname, directory);
        console.log(`\n👉 Đang chạy: "${command}" trong thư mục: ${fullPath}`);
        execSync(command, { cwd: fullPath, stdio: 'inherit' });
    } catch (error) {
        console.error(`❌ Lỗi khi chạy lệnh "${command}" trong thư mục ${directory}:`, error.message);
        process.exit(1);
    }
}

function runDevCommand(command, directory = '.', label = 'PROCESS') {
    const fullPath = path.join(__dirname, directory);
    const child = spawn(command, { cwd: fullPath, shell: true });

    child.stdout.on('data', (data) => {
        process.stdout.write(`[${label}] ${data}`);
    });

    child.stderr.on('data', (data) => {
        process.stderr.write(`[${label} ERROR] ${data}`);
    });

    child.on('close', (code) => {
        console.log(`\n🔚 [${label}] kết thúc với mã: ${code}`);
    });
}

// ====== CÀI ĐẶT ======
console.log('\n🚀 Bắt đầu cài đặt...');
runSyncCommand('npm install');
runSyncCommand('npm install', 'FE');

// ====== KHỞI CHẠY ======
console.log('\n⚡ Đang khởi chạy cả hai server...');

runDevCommand('npm run dev', '.', 'MAIN');
runDevCommand('npm run dev', 'FE', 'FE');

console.log('\n🎉 Tất cả đã được khởi động. Hãy theo dõi log ở phía trên!');
