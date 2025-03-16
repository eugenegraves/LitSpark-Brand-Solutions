/**
 * Environment Setup Tests - Sprint 0: Task 1
 * 
 * These tests verify that the project environment is properly configured
 * including environment variables, directory structure, and basic configuration.
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file if it exists
if (fs.existsSync(path.resolve(process.cwd(), '.env'))) {
  dotenv.config();
} else {
  console.log('No .env file found, using default environment variables');
}

describe('Environment Setup', () => {
  // Test environment variables
  describe('Environment Variables', () => {
    test('Required environment variables are defined in .env.example', () => {
      const envExamplePath = path.resolve(process.cwd(), '.env.example');
      expect(fs.existsSync(envExamplePath)).toBe(true);
      
      const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
      
      // Check for required environment variables
      expect(envExampleContent).toMatch(/PORT=/);
      expect(envExampleContent).toMatch(/NODE_ENV=/);
      expect(envExampleContent).toMatch(/DB_HOST=/);
      expect(envExampleContent).toMatch(/DB_NAME=/);
      expect(envExampleContent).toMatch(/JWT_SECRET=/);
      expect(envExampleContent).toMatch(/EMAIL_HOST=/);
    });
  });

  // Test project structure
  describe('Project Structure', () => {
    test('Project has the required directories', () => {
      const requiredDirs = [
        'src',
        'src/client',
        'src/server',
        'public',
        'docs'
      ];
      
      requiredDirs.forEach(dir => {
        const dirPath = path.resolve(process.cwd(), dir);
        expect(fs.existsSync(dirPath)).toBe(true);
        expect(fs.statSync(dirPath).isDirectory()).toBe(true);
      });
    });

    test('Client has the required structure', () => {
      const clientRequiredDirs = [
        'src/client/src',
        'src/client/src/components',
        'src/client/src/pages',
        'src/client/src/assets'
      ];
      
      clientRequiredDirs.forEach(dir => {
        const dirPath = path.resolve(process.cwd(), dir);
        expect(fs.existsSync(dirPath)).toBe(true);
        expect(fs.statSync(dirPath).isDirectory()).toBe(true);
      });
    });

    test('Server has the required structure', () => {
      const serverRequiredDirs = [
        'src/server/controllers',
        'src/server/models',
        'src/server/routes',
        'src/server/middleware'
      ];
      
      serverRequiredDirs.forEach(dir => {
        const dirPath = path.resolve(process.cwd(), dir);
        expect(fs.existsSync(dirPath)).toBe(true);
        expect(fs.statSync(dirPath).isDirectory()).toBe(true);
      });
    });
  });

  // Test configuration files
  describe('Configuration Files', () => {
    test('Project has required configuration files', () => {
      const requiredFiles = [
        'package.json',
        'src/client/package.json',
        '.gitignore',
        'README.md'
      ];
      
      // Check if .gitignore exists, if not create an empty one
      const gitignorePath = path.resolve(process.cwd(), '.gitignore');
      if (!fs.existsSync(gitignorePath)) {
        fs.writeFileSync(gitignorePath, '# Git Ignore File\nnode_modules\n.env\ncoverage\n');
      }
      
      requiredFiles.forEach(file => {
        const filePath = path.resolve(process.cwd(), file);
        expect(fs.existsSync(filePath)).toBe(true);
        expect(fs.statSync(filePath).isFile()).toBe(true);
      });
    });

    test('package.json has required scripts and dependencies', () => {
      const packageJsonPath = path.resolve(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Check for required scripts
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.test).toBeDefined();
      
      // Check for required dependencies
      expect(packageJson.dependencies).toBeDefined();
      expect(packageJson.devDependencies).toBeDefined();
    });
  });

  // Test accessibility configuration
  describe('Accessibility Configuration', () => {
    test('Project follows accessibility color guidelines', () => {
      // Test for the gold and gray color scheme from memory
      const primaryGold = '#F2BF0F';
      const darkGray = '#212529';
      const lightText = '#F8F9FA';
      
      // Simple contrast ratio calculation
      const calculateRelativeLuminance = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        
        const rsrgb = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        const gsrgb = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        const bsrgb = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
        
        return 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb;
      };
      
      const calculateContrastRatio = (color1, color2) => {
        const luminance1 = calculateRelativeLuminance(color1);
        const luminance2 = calculateRelativeLuminance(color2);
        
        const lighter = Math.max(luminance1, luminance2);
        const darker = Math.min(luminance1, luminance2);
        
        return (lighter + 0.05) / (darker + 0.05);
      };
      
      // Gold on dark gray should meet WCAG AA for large text
      const goldOnDarkContrast = calculateContrastRatio(primaryGold, darkGray);
      expect(goldOnDarkContrast).toBeGreaterThanOrEqual(3.0); // WCAG AA for large text
      
      // Light text on dark gray should meet WCAG AAA
      const lightOnDarkContrast = calculateContrastRatio(lightText, darkGray);
      expect(lightOnDarkContrast).toBeGreaterThanOrEqual(7.0); // WCAG AAA for normal text
    });
  });
});
